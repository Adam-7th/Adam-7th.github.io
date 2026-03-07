const CP1252_BYTE_BY_UNICODE = new Map<number, number>([
  [0x20ac, 0x80],
  [0x201a, 0x82],
  [0x0192, 0x83],
  [0x201e, 0x84],
  [0x2026, 0x85],
  [0x2020, 0x86],
  [0x2021, 0x87],
  [0x02c6, 0x88],
  [0x2030, 0x89],
  [0x0160, 0x8a],
  [0x2039, 0x8b],
  [0x0152, 0x8c],
  [0x017d, 0x8e],
  [0x2018, 0x91],
  [0x2019, 0x92],
  [0x201c, 0x93],
  [0x201d, 0x94],
  [0x2022, 0x95],
  [0x2013, 0x96],
  [0x2014, 0x97],
  [0x02dc, 0x98],
  [0x2122, 0x99],
  [0x0161, 0x9a],
  [0x203a, 0x9b],
  [0x0153, 0x9c],
  [0x017e, 0x9e],
  [0x0178, 0x9f],
]);

const MOJIBAKE_PATTERN = /[ÐÑØÙÃÂ]/;

const toCp1252Bytes = (value: string): Uint8Array | null => {
  const bytes: number[] = [];

  for (const char of value) {
    const code = char.codePointAt(0);
    if (code === undefined) continue;

    if (code <= 0xff) {
      bytes.push(code);
      continue;
    }

    const mapped = CP1252_BYTE_BY_UNICODE.get(code);
    if (mapped !== undefined) {
      bytes.push(mapped);
      continue;
    }

    return null;
  }

  return Uint8Array.from(bytes);
};

export const decodeMojibake = (value: string): string => {
  if (!MOJIBAKE_PATTERN.test(value)) {
    return value;
  }

  const bytes = toCp1252Bytes(value);
  if (!bytes) {
    return value;
  }

  try {
    const decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return decoded || value;
  } catch {
    return value;
  }
};

export const decodeMojibakeDeep = <T>(value: T): T => {
  if (typeof value === "string") {
    return decodeMojibake(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => decodeMojibakeDeep(item)) as T;
  }

  if (value && typeof value === "object") {
    const mapped = Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, nested]) => [key, decodeMojibakeDeep(nested)]),
    );
    return mapped as T;
  }

  return value;
};
