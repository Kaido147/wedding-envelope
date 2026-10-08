"use client";

import { createContext, useContext, useRef, useSyncExternalStore, type HTMLAttributes, type ReactNode } from "react";
import { motion, useInView, useMotionValue, useScroll, useTransform, type MotionValue } from "motion/react";
import { invitationMotion } from "../motion-config";

// A primitive snapshot keeps media changes out of the scroll-frame path.
function subscribe(callback: () => void) {
  const queries = [invitationMotion.desktopQuery, invitationMotion.reducedQuery].map((query) => window.matchMedia(query));
  queries.forEach((query) => query.addEventListener("change", callback));
  return () => queries.forEach((query) => query.removeEventListener("change", callback));
}
function getSnapshot() {
  if (window.matchMedia(invitationMotion.reducedQuery).matches) return 0;
  return window.matchMedia(invitationMotion.desktopQuery).matches ? 2 : 1;
}
function getServerSnapshot() { return 0; }

const SceneContext = createContext<{ progress: MotionValue<number>; media: number; visible: boolean } | null>(null);

export function MotionScene({ as = "section", children, ...props }: HTMLAttributes<HTMLElement> & { as?: "section" | "footer"; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const media = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const visible = useInView(ref, { margin: "120px 0px 120px 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"], trackContentSize: true });

  const Tag = as;
  return <Tag {...props} ref={ref} data-motion-scene="">
    <SceneContext.Provider value={{ progress: scrollYProgress, media, visible }}>{children}</SceneContext.Provider>
  </Tag>;
}

export function ParallaxLayer({ preset, children, className = "", as = "div" }: { preset: keyof typeof invitationMotion.travel; children: ReactNode; className?: string; as?: "div" | "span" }) {
  const scene = useContext(SceneContext);
  const fallback = useMotionValue(0);
  const travel = invitationMotion.travel[preset];
  const distance = scene?.media === 2 ? travel.desktop : travel.mobile;
  const y = useTransform(scene?.progress ?? fallback, [0, 1], [-distance / 2, distance / 2], { clamp: true });
  const Tag = as === "span" ? motion.span : motion.div;

  return <Tag className={`parallax-layer ${className}`} data-parallax={preset}
    style={{ y: scene?.media ? y : 0, willChange: scene?.media && scene.visible ? "transform" : undefined }}>{children}</Tag>;
}
