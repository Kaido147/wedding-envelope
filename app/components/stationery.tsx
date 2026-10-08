import Image from "next/image";
import { wedding } from "../wedding-content";

export function Botanical({ className = "", eager = false }: { className?: string; eager?: boolean }) {
  return (
    <span className={`botanical ${className}`} aria-hidden="true">
      <Image src={wedding.decorations.botanical} alt="" width={1312} height={1199}
        sizes="(max-width: 767px) 190px, 380px" loading={eager ? "eager" : "lazy"} />
    </span>
  );
}

export function WaxSeal({ className = "" }: { className?: string }) {
  return (
    <span className={`wax-seal ${className}`} aria-hidden="true">
      <Image src={wedding.decorations.seal} alt="" width={1254} height={1254} sizes="100px" />
    </span>
  );
}

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg className={`ornament ${className}`} viewBox="0 0 180 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M8 12h60c12 0 15-7 22-7s10 7 22 7h60M68 12c12 0 15 7 22 7s10-7 22-7" />
      <path d="M76 12c-4-1-7-5-7-8 5 0 9 3 10 7M101 11c1-4 5-7 10-7 0 4-4 7-8 8M85 10l5-7 5 7-5 11z" />
    </svg>
  );
}

export function PaperEdge({ className = "" }: { className?: string }) {
  return (
    <svg className={`section-edge ${className}`} viewBox="0 0 1200 24" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M0 0h1200v10l-17-2-12 4-19-2-13 5-25-3-16 3-13-4-19 3-15-4-19 5-23-2-15 3-16-5-20 4-13-3-21 4-18-2-19 3-15-4-25 2-13-3-16 5-20-3-16 3-23-5-15 3-18-2-12 5-22-3-18 2-20-4-17 4-15-2-24 3-12-4-19 3-17-3-18 4-15-2-21 3-18-4-17 2-15-3-22 5-15-3-18 2-23-4-15 4-19-2-16 3-22-4-16 4-16-3-19 2-16-4-22 5-19-2-14 3-17-5-23 4-16-3-19 3-16-2-14 3-23-5-18 4-19-2L0 12z" />
    </svg>
  );
}
