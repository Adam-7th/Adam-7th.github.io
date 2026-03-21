import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/request";

// ── Types ─────────────────────────────────────────────────────────────────────

type SuggestionCategory =
  | "data-quality"
  | "repeat"
  | "modify"
  | "analyze"
  | "control"
  | "safety"
  | "next-step"
  | "documentation";

type ConfidenceLevel = "high" | "medium" | "low";

export type Suggestion = {
  id: string;
  category: SuggestionCategory;
  title: string;
  suggestion: string;
  reasoning: string;
  safetyNote: string;
  confidence: ConfidenceLevel;
};

type CsvStats = {
  headers: string[];
  rowCount: number;
  missingValueCols: string[];
  highVarianceCols: Array<{ name: string; cv: number }>;
  outlierCols: Array<{ name: string; count: number }>;
  trendCols: Array<{ name: string; direction: "increasing" | "decreasing" }>;
  smallSample: boolean;
  numericCols: string[];
};

// ── CSV analysis helpers ──────────────────────────────────────────────────────

function parseCsv(raw: string): { headers: string[]; rows: Record<string, string>[] } {
  const lines = raw
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) return { headers: [], rows: [] };

  const parseRow = (line: string): string[] => {
    const cells: string[] = [];
    let inQuote = false;
    let cell = "";
    for (const ch of line) {
      if (ch === '"') {
        inQuote = !inQuote;
      } else if (ch === "," && !inQuote) {
        cells.push(cell.trim());
        cell = "";
      } else {
        cell += ch;
      }
    }
    cells.push(cell.trim());
    return cells;
  };

  const headers = parseRow(lines[0]);
  const rows = lines.slice(1).map((line) => {
    const cells = parseRow(line);
    return Object.fromEntries(headers.map((h, i) => [h, cells[i] ?? ""]));
  });

  return { headers, rows };
}

function analyzeCsv(raw: string): CsvStats {
  const { headers, rows } = parseCsv(raw);

  const missingValueCols: string[] = [];
  const highVarianceCols: Array<{ name: string; cv: number }> = [];
  const outlierCols: Array<{ name: string; count: number }> = [];
  const trendCols: Array<{ name: string; direction: "increasing" | "decreasing" }> = [];
  const numericCols: string[] = [];

  for (const header of headers) {
    const values = rows.map((r) => r[header] ?? "");
    const missing = values.filter((v) => v === "" || v.toLowerCase() === "na" || v.toLowerCase() === "n/a" || v.toLowerCase() === "null").length;
    if (missing > 0) missingValueCols.push(header);

    const numeric = values.map((v) => parseFloat(v)).filter((n) => !isNaN(n));
    if (numeric.length < 2) continue;

    numericCols.push(header);

    const mean = numeric.reduce((s, v) => s + v, 0) / numeric.length;
    const variance = numeric.reduce((s, v) => s + (v - mean) ** 2, 0) / numeric.length;
    const std = Math.sqrt(variance);
    const cv = mean !== 0 ? std / Math.abs(mean) : 0;

    if (cv > 0.3) highVarianceCols.push({ name: header, cv: Math.round(cv * 100) / 100 });

    const outlierThreshold = 2 * std;
    const outlierCount = numeric.filter((v) => Math.abs(v - mean) > outlierThreshold).length;
    if (outlierCount > 0) outlierCols.push({ name: header, count: outlierCount });

    // Simple trend: check if each consecutive value is ≥ previous (monotone)
    let increases = 0;
    let decreases = 0;
    for (let i = 1; i < numeric.length; i++) {
      if (numeric[i] > numeric[i - 1]) increases++;
      else if (numeric[i] < numeric[i - 1]) decreases++;
    }
    const total = numeric.length - 1;
    if (increases / total >= 0.8) trendCols.push({ name: header, direction: "increasing" });
    else if (decreases / total >= 0.8) trendCols.push({ name: header, direction: "decreasing" });
  }

  return {
    headers,
    rowCount: rows.length,
    missingValueCols,
    highVarianceCols,
    outlierCols,
    trendCols,
    smallSample: rows.length < 5,
    numericCols,
  };
}

// ── Notes analysis helpers ────────────────────────────────────────────────────

const SAFETY_KEYWORDS = [
  "toxic", "toxin", "poison", "flammable", "explosive", "corrosive",
  "acid", "base", "alkali", "radiation", "radioactive", "carcinogen",
  "biohazard", "pathogen", "virus", "bacteria", "volatile", "hazardous",
  "chemical", "reagent", "solvent", "fume", "aerosol", "pressure",
];

const CONTROL_KEYWORDS = ["control", "baseline", "blank", "negative control", "positive control", "reference"];
const REPLICATE_KEYWORDS = ["replicate", "triplicate", "duplicate", "n=", "repeat", "replication"];
const STAT_KEYWORDS = ["p-value", "p value", "anova", "t-test", "chi-square", "regression", "correlation", "significance", "statistic"];
const TIME_KEYWORDS = ["time point", "timepoint", "longitudinal", "follow-up", "hours", "days", "weeks", "months", "incubation", "duration"];
const VARIABLE_KEYWORDS = ["temperature", "ph", "concentration", "dose", "pressure", "humidity", "voltage", "current", "flow rate", "wavelength"];

function detectKeywords(notes: string, keywords: string[]): string[] {
  const lower = notes.toLowerCase();
  return keywords.filter((kw) => lower.includes(kw.toLowerCase()));
}

function countReplicates(notes: string): number | null {
  const match = /\bn\s*=\s*(\d+)/i.exec(notes);
  if (match) return parseInt(match[1], 10);
  if (/\btriplicate\b/i.test(notes)) return 3;
  if (/\bduplicate\b/i.test(notes)) return 2;
  return null;
}

// ── Suggestion builder ────────────────────────────────────────────────────────

let idCounter = 0;
function makeId(): string {
  idCounter = (idCounter + 1) % 1_000_000;
  return `sug-${Date.now()}-${idCounter}`;
}

function buildSuggestions(notes: string, csvStats: CsvStats | null, imageCount: number): Suggestion[] {
  const suggestions: Suggestion[] = [];

  const safetyHits = detectKeywords(notes, SAFETY_KEYWORDS);
  const hasControl = detectKeywords(notes, CONTROL_KEYWORDS).length > 0;
  const hasReplicates = detectKeywords(notes, REPLICATE_KEYWORDS).length > 0;
  const hasStats = detectKeywords(notes, STAT_KEYWORDS).length > 0;
  const hasTimeKeywords = detectKeywords(notes, TIME_KEYWORDS).length > 0;
  const detectedVariables = detectKeywords(notes, VARIABLE_KEYWORDS);
  const replicateN = countReplicates(notes);
  const notesWordCount = notes.trim().split(/\s+/).length;

  // ── Safety check ────────────────────────────────────────────────────────────
  if (safetyHits.length > 0) {
    suggestions.push({
      id: makeId(),
      category: "safety",
      title: "Review safety protocols before proceeding",
      suggestion:
        `Your notes mention ${safetyHits.slice(0, 3).join(", ")}${safetyHits.length > 3 ? ` and ${safetyHits.length - 3} more hazardous term(s)` : ""}. ` +
        "Verify that all applicable safety data sheets (SDS) are reviewed, appropriate PPE is in place, and waste disposal follows institutional guidelines before continuing.",
      reasoning:
        `The presence of keywords such as "${safetyHits[0]}" indicates potential hazards that must be addressed proactively. ` +
        "Safety reviews are a non-negotiable first step in any experimental workflow.",
      safetyNote: "This suggestion should be acted on before any wet-lab work continues. Consult your institution's EHS office if unsure.",
      confidence: "high",
    });
  }

  // ── Control group ───────────────────────────────────────────────────────────
  if (!hasControl && notes.length > 20) {
    suggestions.push({
      id: makeId(),
      category: "control",
      title: "Add a control group or baseline measurement",
      suggestion:
        "Include a negative control (no treatment), a positive control (known outcome), or a baseline measurement in your next run. " +
        "Controls allow you to separate true experimental effects from environmental variation or instrument drift.",
      reasoning:
        "Your notes do not mention a control condition. Without a reference point, it is difficult to determine whether observed changes are due to the experimental variable or background noise.",
      safetyNote: "Ensure control samples receive the same handling and storage conditions as experimental samples to avoid bias.",
      confidence: "medium",
    });
  }

  // ── Replicates ──────────────────────────────────────────────────────────────
  if (!hasReplicates && notes.length > 20) {
    suggestions.push({
      id: makeId(),
      category: "repeat",
      title: "Increase replicates to at least three (n ≥ 3)",
      suggestion:
        "Run the experiment in biological or technical triplicates (n = 3 minimum). " +
        "This allows you to calculate standard deviation, apply basic statistical tests, and distinguish real effects from random variation.",
      reasoning:
        "Your notes do not mention replicates or sample size. A single measurement cannot distinguish effect from noise. " +
        "Statistical power is severely limited without sufficient replicates.",
      safetyNote: "Use the same reagent batch, instrument calibration, and environmental conditions across all replicates to maintain internal consistency.",
      confidence: "medium",
    });
  } else if (replicateN !== null && replicateN < 3) {
    suggestions.push({
      id: makeId(),
      category: "repeat",
      title: `Increase replicates from n = ${replicateN} to at least n = 3`,
      suggestion:
        `Your notes indicate n = ${replicateN}. Increase to at least three biological replicates to enable meaningful statistical comparison.`,
      reasoning:
        `With n = ${replicateN}, parametric statistical tests such as t-tests or ANOVA lack the power to reliably detect differences. ` +
        "Most peer-reviewed journals require a minimum of n = 3 for quantitative data.",
      safetyNote: "Prepare additional reagent aliquots in advance to ensure consistent composition across all replicates.",
      confidence: "high",
    });
  }

  // ── Statistical analysis ────────────────────────────────────────────────────
  if (!hasStats && csvStats && csvStats.numericCols.length > 0) {
    suggestions.push({
      id: makeId(),
      category: "analyze",
      title: "Apply statistical analysis to your numeric data",
      suggestion:
        `Your dataset contains ${csvStats.numericCols.length} numeric column(s) (${csvStats.numericCols.slice(0, 3).join(", ")}${csvStats.numericCols.length > 3 ? "…" : ""}). ` +
        "Run a t-test (two groups), one-way ANOVA (multiple groups), or correlation analysis to determine whether observed differences are statistically significant.",
      reasoning:
        "No statistical analysis keywords were detected in the notes. Descriptive statistics alone cannot determine whether differences between groups are meaningful or due to chance.",
      safetyNote: "Verify that your data meets the assumptions of the chosen test (normality, equal variance) before interpreting p-values.",
      confidence: "medium",
    });
  }

  // ── CSV-specific suggestions ─────────────────────────────────────────────────
  if (csvStats) {
    // Missing values
    if (csvStats.missingValueCols.length > 0) {
      suggestions.push({
        id: makeId(),
        category: "data-quality",
        title: "Investigate and address missing values",
        suggestion:
          `Column(s) ${csvStats.missingValueCols.slice(0, 4).join(", ")} contain missing values. ` +
          "Determine the cause: instrument failure, sample loss, or data entry error. " +
          "Consider repeating those measurements or, if appropriate, using imputation with proper justification.",
        reasoning:
          `Missing data can introduce bias and reduce statistical power. The ${csvStats.missingValueCols.length} affected column(s) should be investigated before drawing conclusions.`,
        safetyNote: "Do not impute or discard data arbitrarily — document every decision about missing values for reproducibility.",
        confidence: "high",
      });
    }

    // High variance columns
    if (csvStats.highVarianceCols.length > 0) {
      const col = csvStats.highVarianceCols[0];
      suggestions.push({
        id: makeId(),
        category: "repeat",
        title: `Reduce variability in high-variance column "${col.name}"`,
        suggestion:
          `The column "${col.name}" has a coefficient of variation of ${(col.cv * 100).toFixed(0)}% (>30%). ` +
          "Standardize sample preparation, recalibrate instruments, or increase the number of replicates to bring variance down before comparing groups.",
        reasoning:
          `A CV above 30% suggests the measurement is inconsistent. This level of variability makes it difficult to detect true treatment effects and can invalidate statistical comparisons.`,
        safetyNote: "Check that reagents are within their expiry date and instruments are properly calibrated before the next run.",
        confidence: "high",
      });
    }

    // Outliers
    if (csvStats.outlierCols.length > 0) {
      const col = csvStats.outlierCols[0];
      suggestions.push({
        id: makeId(),
        category: "data-quality",
        title: `Investigate ${col.count} outlier(s) in column "${col.name}"`,
        suggestion:
          `Column "${col.name}" contains ${col.count} value(s) that deviate more than two standard deviations from the mean. ` +
          "Inspect the raw data, instrument logs, and sample records for those data points to determine whether they are true biological variation, measurement error, or data entry mistakes.",
        reasoning:
          `Outliers can substantially skew means and inflate variance, leading to false conclusions. Each outlier requires individual investigation before inclusion or exclusion.`,
        safetyNote: "Never remove outliers without documented, scientific justification. Arbitrary exclusion is considered data manipulation.",
        confidence: "high",
      });
    }

    // Trends
    if (csvStats.trendCols.length > 0) {
      const col = csvStats.trendCols[0];
      suggestions.push({
        id: makeId(),
        category: "analyze",
        title: `Characterize the ${col.direction} trend in "${col.name}"`,
        suggestion:
          `Column "${col.name}" shows a consistently ${col.direction} trend. ` +
          "Fit a regression model (linear or non-linear) to quantify the rate of change. " +
          "Design follow-up experiments that probe the mechanistic cause of this trend.",
        reasoning:
          `An ${col.direction} pattern across ≥80% of consecutive measurements suggests a real directional effect rather than random fluctuation. Quantifying this effect will strengthen your conclusions.`,
        safetyNote: "Ensure subsequent experiments that manipulate this variable are conducted within safe operating ranges.",
        confidence: "medium",
      });
    }

    // Small sample
    if (csvStats.smallSample) {
      suggestions.push({
        id: makeId(),
        category: "repeat",
        title: `Expand dataset from ${csvStats.rowCount} row(s) for reliable statistics`,
        suggestion:
          `Your CSV contains only ${csvStats.rowCount} data row(s). ` +
          "Collect more measurements or experimental replicates to achieve adequate statistical power. " +
          "A power analysis can guide the minimum sample size needed for your expected effect size.",
        reasoning:
          `With fewer than 5 observations, most statistical tests are unreliable and confidence intervals will be very wide. The results cannot be meaningfully generalized.`,
        safetyNote: "Plan additional experiments carefully to avoid unnecessary reagent waste. A power analysis will ensure you collect exactly what is needed.",
        confidence: "high",
      });
    }
  }

  // ── Experimental variables ──────────────────────────────────────────────────
  if (detectedVariables.length > 0) {
    const variable = detectedVariables[0];
    suggestions.push({
      id: makeId(),
      category: "modify",
      title: `Systematically vary "${variable}" while holding others constant`,
      suggestion:
        `Your notes mention ${variable}. In the next experiment, vary this parameter across a range of at least 4–5 levels while keeping all other conditions constant (one-variable-at-a-time, OVAT). ` +
        "Record the response at each level to build a dose–response or parameter–response curve.",
      reasoning:
        `Detecting ${variable} in your notes suggests it may be an independent variable. A systematic sweep across levels will reveal optimal conditions and the shape of the response relationship.`,
      safetyNote: `Before expanding the ${variable} range, confirm that extreme values are within instrument ratings and material safety limits.`,
      confidence: "medium",
    });
  }

  // ── Time course ─────────────────────────────────────────────────────────────
  if (hasTimeKeywords && !csvStats?.trendCols.length) {
    suggestions.push({
      id: makeId(),
      category: "next-step",
      title: "Add intermediate time points to resolve kinetics",
      suggestion:
        "Your notes reference time-dependent measurements. Add intermediate time points between your current measurements to capture the shape of the response curve (e.g., plateau, lag phase, decay). " +
        "At least 6–8 time points are recommended for curve fitting.",
      reasoning:
        "Time-course data with only start and end points cannot distinguish linear from exponential or sigmoidal kinetics, which affects mechanism interpretation and predictive modelling.",
      safetyNote: "Plan time-point collection to minimise repeated sample handling. Prepare sufficient aliquots before the experiment starts.",
      confidence: "medium",
    });
  }

  // ── Image-based suggestion ──────────────────────────────────────────────────
  if (imageCount > 0) {
    suggestions.push({
      id: makeId(),
      category: "analyze",
      title: `Quantify visual patterns in ${imageCount} uploaded image(s)`,
      suggestion:
        "Convert qualitative visual observations into quantitative measurements using image analysis software (ImageJ / FIJI, CellProfiler, or Python's scikit-image). " +
        "Measure features such as area, intensity, morphology, or object count to enable statistical comparison.",
      reasoning:
        `You provided ${imageCount} image(s) containing visual results. Subjective visual interpretation introduces observer bias and cannot be statistically tested. Quantification makes your data reproducible and publishable.`,
      safetyNote: "Ensure images are collected under identical, standardised conditions (same magnification, exposure, staining protocol) before comparing measurements.",
      confidence: "medium",
    });
  }

  // ── Documentation ───────────────────────────────────────────────────────────
  if (notesWordCount < 30) {
    suggestions.push({
      id: makeId(),
      category: "documentation",
      title: "Expand experiment notes for reproducibility",
      suggestion:
        "Your notes are brief. Record: (1) the full hypothesis, (2) all reagents with lot numbers and concentrations, (3) instrument settings, (4) environmental conditions (temperature, humidity), and (5) any deviations from protocol.",
      reasoning:
        "Sparse notes make it impossible for another researcher (or your future self) to reproduce the experiment. Complete documentation is a fundamental requirement of good scientific practice.",
      safetyNote: "Include the date, time, and operator name in all records. Store notes in a tamper-evident electronic lab notebook where possible.",
      confidence: "high",
    });
  }

  // ── Statistical reporting ───────────────────────────────────────────────────
  if (hasStats && csvStats && csvStats.numericCols.length > 0) {
    suggestions.push({
      id: makeId(),
      category: "analyze",
      title: "Report effect size alongside p-values",
      suggestion:
        "In addition to p-values, report effect sizes (Cohen's d, eta-squared, or fold-change) and 95% confidence intervals for all comparisons. " +
        "This gives readers a complete picture of the magnitude and precision of your findings.",
      reasoning:
        "A statistically significant p-value only tells you an effect is unlikely to be zero — it does not indicate whether the effect is scientifically meaningful. Effect sizes and confidence intervals provide that context.",
      safetyNote: "None specific. This is a statistical reporting improvement.",
      confidence: "medium",
    });
  }

  // ── General next step (always include one if no others triggered) ────────────
  if (suggestions.length === 0) {
    suggestions.push({
      id: makeId(),
      category: "next-step",
      title: "Define a clear hypothesis and success criteria",
      suggestion:
        "Formulate a specific, testable hypothesis (e.g., 'Treatment X will increase Y by Z% compared to control'). " +
        "Pre-define your success criteria, expected effect size, and acceptable p-value threshold before collecting data.",
      reasoning:
        "Without a pre-defined hypothesis and success criteria, there is a risk of p-hacking or post-hoc rationalisation of results. A clear hypothesis also guides the choice of statistical test.",
      safetyNote: "Consult your supervisor or statistician when setting up a new experimental design for the first time.",
      confidence: "medium",
    });
  }

  return suggestions;
}

// ── Route handler ─────────────────────────────────────────────────────────────

const MAX_NOTES = 8000;
const MAX_CSV = 50_000;
const MAX_IMAGE_COUNT = 20;
const MAX_EXPERIMENT_NAME = 200;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`lab-assistant:post:${ip}`, 20, 60_000);
  if (!rate.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;

  const experimentName =
    typeof raw.experimentName === "string"
      ? raw.experimentName.replace(/\s+/g, " ").trim().slice(0, MAX_EXPERIMENT_NAME)
      : "";

  const notes =
    typeof raw.notes === "string"
      ? raw.notes.replace(/\r/g, "").replace(/\u0000/g, "").trim().slice(0, MAX_NOTES)
      : "";

  const csvData =
    typeof raw.csvData === "string"
      ? raw.csvData.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\u0000/g, "").trim().slice(0, MAX_CSV)
      : "";

  const imageCount =
    typeof raw.imageCount === "number" && isFinite(raw.imageCount)
      ? Math.min(Math.max(0, Math.floor(raw.imageCount)), MAX_IMAGE_COUNT)
      : 0;

  if (!notes && !csvData && imageCount === 0) {
    return NextResponse.json(
      { error: "Provide at least one of: experiment notes, CSV data, or images." },
      { status: 400 },
    );
  }

  const csvStats = csvData.length > 0 ? analyzeCsv(csvData) : null;
  const suggestions = buildSuggestions(notes, csvStats, imageCount);

  return NextResponse.json({
    experimentName: experimentName || null,
    suggestions,
    analysedAt: new Date().toISOString(),
    disclaimer:
      "These suggestions are generated by a rule-based analysis engine. They are intended to assist — not replace — researcher judgment. Always consult domain experts and institutional guidelines before acting on any recommendation.",
  });
}
