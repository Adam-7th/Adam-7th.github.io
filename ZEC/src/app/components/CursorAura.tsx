"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = "a, button, summary, [role='button'], [data-cursor='interactive']";

export function CursorAura() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ring = ringRef.current;
    const dot = dotRef.current;

    if (!supportsFinePointer || !ring || !dot) return;

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let raf = 0;
    let visible = false;

    const setVisible = (next: boolean) => {
      if (visible === next) return;
      visible = next;
      ring.classList.toggle("is-visible", next);
      dot.classList.toggle("is-visible", next);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      setVisible(true);
    };

    const onPointerOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const isInteractive = Boolean(target?.closest(INTERACTIVE_SELECTOR));
      ring.classList.toggle("is-hover", isInteractive);
      dot.classList.toggle("is-hover", isInteractive);
    };

    const onPointerDown = () => {
      ring.classList.add("is-pressed");
      dot.classList.add("is-pressed");
    };

    const onPointerUp = () => {
      ring.classList.remove("is-pressed");
      dot.classList.remove("is-pressed");
    };

    const onPointerLeave = () => {
      setVisible(false);
      ring.classList.remove("is-hover", "is-pressed");
      dot.classList.remove("is-hover", "is-pressed");
    };

    const animate = () => {
      const smooth = prefersReducedMotion ? 1 : 0.2;
      ringX += (pointerX - ringX) * smooth;
      ringY += (pointerY - ringY) * smooth;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;

      raf = window.requestAnimationFrame(animate);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        onPointerLeave();
      }
    };

    raf = window.requestAnimationFrame(animate);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("blur", onPointerLeave);
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("mouseleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("blur", onPointerLeave);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("mouseleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-aura-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-aura-dot" aria-hidden="true" />
    </>
  );
}
