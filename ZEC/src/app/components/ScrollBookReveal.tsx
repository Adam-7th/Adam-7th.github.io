"use client";

import { useEffect } from "react";

const TARGET_SELECTOR = "main section";

export function ScrollBookReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const observed = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("scroll-book-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -7% 0px" },
    );

    const registerTargets = () => {
      document.querySelectorAll<HTMLElement>(TARGET_SELECTOR).forEach((element) => {
        if (observed.has(element)) return;
        observed.add(element);
        element.classList.add("scroll-book");
        observer.observe(element);
      });
    };

    registerTargets();

    const main = document.querySelector("main");
    const mutationObserver = new MutationObserver(() => {
      registerTargets();
    });

    if (main) {
      mutationObserver.observe(main, { subtree: true, childList: true });
    }

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
