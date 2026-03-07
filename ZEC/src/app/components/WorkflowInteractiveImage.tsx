"use client";

import Image from "next/image";
import { useRef } from "react";

type WorkflowInteractiveImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export function WorkflowInteractiveImage({ src, alt, width, height, className }: WorkflowInteractiveImageProps) {
  const shellRef = useRef<HTMLDivElement>(null);

  const onMouseEnter = () => {
    const shell = shellRef.current;
    if (!shell) return;
    shell.style.setProperty("--wf-scale", "1.65");
  };

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const shell = shellRef.current;
    if (!shell) return;

    const rect = shell.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    shell.style.setProperty("--wf-x", `${x}%`);
    shell.style.setProperty("--wf-y", `${y}%`);
  };

  const onMouseLeave = () => {
    const shell = shellRef.current;
    if (!shell) return;
    shell.style.setProperty("--wf-scale", "1");
    shell.style.setProperty("--wf-x", "50%");
    shell.style.setProperty("--wf-y", "50%");
  };

  return (
    <div
      ref={shellRef}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`workflow-interactive-shell overflow-hidden ${className ?? ""}`.trim()}
    >
      <Image src={src} alt={alt} width={width} height={height} className="workflow-interactive-image h-auto w-full object-cover" />
    </div>
  );
}
