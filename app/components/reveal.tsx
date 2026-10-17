"use client";

import { useEffect, useRef, type CSSProperties, type FormHTMLAttributes, type HTMLAttributes } from "react";
import { invitationMotion } from "../motion-config";

type RevealProps = HTMLAttributes<HTMLElement> & Pick<FormHTMLAttributes<HTMLFormElement>, "action"> & {
  as?: "div" | "span" | "article" | "li" | "form" | "aside";
  variant?: "lift" | "fade";
  order?: number;
};

export function Reveal({ children, className = "", as = "div", variant = "lift", order = 0, style, ...props }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    const preference = window.matchMedia(invitationMotion.reducedQuery);
    if (!element || preference.matches || !("IntersectionObserver" in window)) return;

    function atAnchor() {
      let id: string;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return false; }
      const target = id ? document.getElementById(id) : null;
      return !!target && !!element && (target.contains(element) || element.contains(target));
    }

    const rect = element.getBoundingClientRect();
    // Never hide initial content, a restored scroll position, or an anchor target.
    if (rect.top < window.innerHeight || element.contains(document.activeElement) || atAnchor()) return;
    element.dataset.reveal = "pending";
    let complete = false;
    let observer: IntersectionObserver | undefined;

    function observe() {
      observer?.disconnect();
      if (complete || !element || element.dataset.reveal === "immediate") return;
      // Observer percentage margins are width-based: use pixels for this height-based trigger.
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) show(false);
      }, { threshold: 0, rootMargin: `0px 0px -${window.innerHeight * invitationMotion.entryInset}px 0px` });
      observer.observe(element);
    }

    function show(immediate: boolean) {
      if (!element) return;
      if (!complete && element.dataset.reveal !== "immediate") element.dataset.reveal = immediate ? "immediate" : "shown";
      if (immediate) {
        element.dataset.reveal = "immediate";
        element.querySelectorAll<HTMLElement>("[data-reveal]").forEach((child) => { child.dataset.reveal = "immediate"; });
      }
      complete = true;
      observer?.disconnect();
      window.removeEventListener("resize", observe);
    }
    function onFocus() { show(true); }
    function onPreference() { if (preference.matches) show(true); }
    function onAnchor() { if (atAnchor()) show(true); }

    observe();
    window.addEventListener("resize", observe);
    window.addEventListener("hashchange", onAnchor);
    element.addEventListener("focusin", onFocus);
    preference.addEventListener("change", onPreference);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", observe);
      window.removeEventListener("hashchange", onAnchor);
      element.removeEventListener("focusin", onFocus);
      preference.removeEventListener("change", onPreference);
      delete element.dataset.reveal;
    };
  }, []);

  const motionStyle = {
    "--reveal-duration": `${invitationMotion.duration}ms`,
    "--reveal-lift-desktop": `${variant === "fade" ? 0 : invitationMotion.lift.desktop}px`,
    "--reveal-lift-mobile": `${variant === "fade" ? 0 : invitationMotion.lift.mobile}px`,
    "--reveal-delay": `${Math.min(Math.max(order, 0) * invitationMotion.stagger, invitationMotion.maxDelay)}ms`,
    "--reveal-easing": invitationMotion.easing,
    ...style,
  } as CSSProperties;

  const Tag = as;
  function assignRef(element: HTMLElement | null) { ref.current = element; }
  return <Tag {...props} ref={assignRef} className={`reveal ${className}`} style={motionStyle}>{children}</Tag>;
}
