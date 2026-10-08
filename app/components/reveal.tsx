"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || motion.matches || !("IntersectionObserver" in window)) return;

    const rect = element.getBoundingClientRect();
    // Content is visible in the HTML. Only prepare offscreen elements for motion.
    if (rect.top < window.innerHeight) return;
    element.dataset.reveal = "pending";
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) show();
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

    function show() {
      if (!element) return;
      element.dataset.reveal = "shown";
      observer.disconnect();
    }
    function onMotionChange() { if (motion.matches) show(); }

    observer.observe(element);
    element.addEventListener("focusin", show);
    motion.addEventListener("change", onMotionChange);
    return () => {
      observer.disconnect();
      element.removeEventListener("focusin", show);
      motion.removeEventListener("change", onMotionChange);
      delete element.dataset.reveal;
    };
  }, []);

  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}
