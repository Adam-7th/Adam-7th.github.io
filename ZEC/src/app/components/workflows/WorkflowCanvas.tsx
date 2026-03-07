"use client";

import Image from "next/image";
import { useId, useMemo, useRef } from "react";
import type { Lang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import type { WorkflowCanvasEdge, WorkflowCanvasNode, WorkflowVariant } from "./workflowData";

type WorkflowCanvasProps = {
  lang: Lang;
  variant: WorkflowVariant;
  compact?: boolean;
  className?: string;
};

const CANVAS_PRESET = {
  full: {
    width: 1120,
    height: 470,
    nodeWidth: 178,
    nodeIconSize: 20,
  },
  compact: {
    width: 500,
    height: 290,
    nodeWidth: 118,
    nodeIconSize: 14,
  },
} as const;

const cx = (x: number, width: number) => (x / 100) * width;
const cy = (y: number, height: number) => (y / 100) * height;

export function WorkflowCanvas({ lang, variant, compact = false, className = "" }: WorkflowCanvasProps) {
  const preset = compact ? CANVAS_PRESET.compact : CANVAS_PRESET.full;
  const isRtl = lang === "ar";
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const panRef = useRef<HTMLDivElement>(null);
  const gradId = useId().replace(/:/g, "");
  const markerId = useId().replace(/:/g, "");

  const visibleNodes = useMemo(() => {
    if (!compact || !variant.compactNodeIds?.length) return variant.nodes;
    const allowed = new Set(variant.compactNodeIds);
    return variant.nodes.filter((node) => allowed.has(node.id));
  }, [compact, variant.compactNodeIds, variant.nodes]);

  const nodeMap = useMemo(() => new Map(visibleNodes.map((node) => [node.id, node])), [visibleNodes]);

  const visibleEdges = useMemo(() => variant.edges.filter((edge) => nodeMap.has(edge.from) && nodeMap.has(edge.to)), [variant.edges, nodeMap]);

  const animatedEdges = useMemo(() => visibleEdges.filter((_, index) => index % 2 === 0).slice(0, 3), [visibleEdges]);

  const compactXBounds = useMemo(() => {
    if (!compact || !visibleNodes.length) return null;
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    visibleNodes.forEach((node) => {
      min = Math.min(min, node.x);
      max = Math.max(max, node.x);
    });

    if (!Number.isFinite(min) || !Number.isFinite(max) || max - min < 1) return null;
    return { min, max };
  }, [compact, visibleNodes]);

  const resolveX = (x: number) => {
    if (!compactXBounds) return x;
    const compactSidePadding = ((preset.nodeWidth / 2 + 8) / preset.width) * 100;
    const compactStart = Math.max(8, compactSidePadding);
    const compactEnd = Math.min(92, 100 - compactSidePadding);
    if (compactEnd <= compactStart) return x;
    const ratio = (x - compactXBounds.min) / (compactXBounds.max - compactXBounds.min);
    return compactStart + ratio * (compactEnd - compactStart);
  };

  const toPath = (edge: WorkflowCanvasEdge) => {
    const from = nodeMap.get(edge.from);
    const to = nodeMap.get(edge.to);
    if (!from || !to) return null;

    const startX = cx(resolveX(from.x), preset.width);
    const startY = cy(from.y, preset.height);
    const endX = cx(resolveX(to.x), preset.width);
    const endY = cy(to.y, preset.height);
    const spread = Math.max(Math.abs(endX - startX) * 0.36, compact ? 48 : 72);
    const direction = endX >= startX ? 1 : -1;
    const curve = edge.curve ?? 0;

    return `M ${startX} ${startY} C ${startX + spread * direction} ${startY + curve}, ${endX - spread * direction} ${endY + curve}, ${endX} ${endY}`;
  };

  const canvasMinWidth = compact ? "min-w-[500px]" : "min-w-[980px]";
  const panScale = compact ? 1.5 : 1.36;

  const onPanEnter = () => {
    const shell = panRef.current;
    if (!shell) return;
    shell.style.setProperty("--wf-scale", String(panScale));
  };

  const onPanMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const shell = panRef.current;
    if (!shell) return;
    const rect = shell.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    shell.style.setProperty("--wf-x", `${x}%`);
    shell.style.setProperty("--wf-y", `${y}%`);
  };

  const onPanLeave = () => {
    const shell = panRef.current;
    if (!shell) return;
    shell.style.setProperty("--wf-scale", "1");
    shell.style.setProperty("--wf-x", "50%");
    shell.style.setProperty("--wf-y", "50%");
  };

  return (
    <div
      ref={panRef}
      onMouseEnter={onPanEnter}
      onMouseMove={onPanMove}
      onMouseLeave={onPanLeave}
      className={`workflow-interactive-shell overflow-x-auto rounded-2xl border border-edge/90 ${className}`}
    >
      <div
        className={`workflow-interactive-image relative ${canvasMinWidth}`}
        style={{
          width: compact ? "100%" : `${preset.width}px`,
          height: `${preset.height}px`,
          backgroundColor: isDark ? "#171C29" : "#F7FAFF",
          backgroundImage: isDark
            ? "radial-gradient(rgba(154,173,204,0.27) 0.9px, transparent 0.9px), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))"
            : "radial-gradient(rgba(119,145,184,0.29) 0.9px, transparent 0.9px), linear-gradient(180deg, rgba(255,255,255,0.75), rgba(247,250,255,0.94))",
          backgroundSize: compact ? "14px 14px, 100% 100%" : "16px 16px, 100% 100%",
        }}
        dir="ltr"
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${preset.width} ${preset.height}`} fill="none" aria-hidden="true">
          <defs>
            <linearGradient id={`workflowEdgeGlow-${gradId}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={isDark ? "#89A8D8" : "#6E8DB7"} stopOpacity={isDark ? "0.3" : "0.26"} />
              <stop offset="50%" stopColor={isDark ? "#AFC9FF" : "#5E88CB"} stopOpacity={isDark ? "0.9" : "0.68"} />
              <stop offset="100%" stopColor={isDark ? "#89A8D8" : "#6E8DB7"} stopOpacity={isDark ? "0.3" : "0.26"} />
            </linearGradient>
            <marker id={`workflowArrowHead-${markerId}`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0 0L8 4L0 8Z" fill={isDark ? "#A5BFEA" : "#6B8FC6"} />
            </marker>
          </defs>

          {visibleEdges.map((edge) => {
            const path = toPath(edge);
            if (!path) return null;
            return (
              <g key={`${edge.from}-${edge.to}`}>
                <path d={path} stroke={isDark ? "rgba(41,121,255,0.14)" : "rgba(67,126,206,0.2)"} strokeWidth={compact ? "4.8" : "6"} fill="none" />
                <path
                  d={path}
                  stroke={`url(#workflowEdgeGlow-${gradId})`}
                  strokeWidth={compact ? "1.6" : "2"}
                  fill="none"
                  markerEnd={`url(#workflowArrowHead-${markerId})`}
                />
              </g>
            );
          })}

          {animatedEdges.map((edge, index) => {
            const path = toPath(edge);
            if (!path) return null;
            return (
              <circle key={`flow-dot-${edge.from}-${edge.to}`} r={compact ? "2.7" : "3.2"} fill={isDark ? "#69ACFF" : "#3E82E2"}>
                <animateMotion dur={`${2.8 + index * 0.45}s`} repeatCount="indefinite" path={path} />
              </circle>
            );
          })}
        </svg>

        {visibleNodes.map((node) => (
          <NodeCard
            key={node.id}
            node={node}
            x={resolveX(node.x)}
            compact={compact}
            nodeWidth={preset.nodeWidth}
            nodeIconSize={preset.nodeIconSize}
            isRtl={isRtl}
            isDark={isDark}
          />
        ))}

        <span className={`absolute bottom-3 right-4 text-[10px] uppercase tracking-[0.18em] ${isDark ? "text-slate-400/30" : "text-slate-500/35"}`}>ZEC</span>
      </div>
    </div>
  );
}

function NodeCard({
  node,
  x,
  compact,
  nodeWidth,
  nodeIconSize,
  isRtl,
  isDark,
}: {
  node: WorkflowCanvasNode;
  x: number;
  compact: boolean;
  nodeWidth: number;
  nodeIconSize: number;
  isRtl: boolean;
  isDark: boolean;
}) {
  return (
    <div className="absolute" style={{ left: `${x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}>
      <div
        className={`workflow-node rounded-2xl border px-3 py-2 ${
          isDark
            ? "border-slate-400/45 bg-slate-900/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_14px_26px_-20px_rgba(95,154,255,0.65)]"
            : "border-edge bg-white/92 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_12px_24px_-22px_rgba(62,110,185,0.33)]"
        } ${isRtl ? "text-right" : "text-left"}`}
        style={{ width: `${nodeWidth}px` }}
      >
        <div className="flex items-center gap-2">
          <span
            className={`media-zoom-shell inline-flex items-center justify-center overflow-hidden rounded-lg border ${isDark ? "border-slate-500/70 bg-slate-800/90" : "border-edge bg-panel2"}`}
            style={{ width: `${nodeIconSize + 12}px`, height: `${nodeIconSize + 12}px` }}
            title={node.iconLabel}
          >
            {node.iconSrc ? (
              <Image src={node.iconSrc} alt={node.iconLabel} width={nodeIconSize} height={nodeIconSize} className="media-zoom object-contain" />
            ) : (
              <span className={`${compact ? "text-xs" : "text-sm"} ${isDark ? "text-slate-100" : "text-text"}`}>{node.fallbackIcon ?? "*"}</span>
            )}
          </span>
          <p className={`${compact ? "text-[10px]" : "text-xs"} font-semibold ${isDark ? "text-slate-100" : "text-text"}`}>{node.title}</p>
        </div>
      </div>
      <p className={`mt-1 text-center ${compact ? "text-[9px]" : "text-[10px]"} uppercase tracking-[0.14em] ${isDark ? "text-slate-400" : "text-muted"}`}>{node.caption}</p>
    </div>
  );
}
