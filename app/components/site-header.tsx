"use client";

import { useEffect, useRef } from "react";

const links = [
  { href: "#our-story", label: "Our story" },
  { href: "#the-day", label: "The day" },
  { href: "#rsvp", label: "RSVP" },
];

export function SiteHeader() {
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && menu.current?.open) {
        menu.current.open = false;
        menu.current.querySelector("summary")?.focus();
      }
    }
    function onPointer(event: PointerEvent) {
      if (menu.current?.open && !menu.current.contains(event.target as Node)) {
        menu.current.open = false;
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner container">
        <nav className="desktop-nav" aria-label="Main navigation">
          <div className="nav-left"><a href={links[0].href}>{links[0].label}</a></div>
          <div className="nav-right">{links.slice(1).map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</div>
        </nav>
        <a href="#top" className="brand" aria-label="Kian and Trisha, back to invitation">K<span>&</span>T</a>
        <details className="mobile-menu" ref={menu}>
          <summary aria-label="Wedding navigation"><span className="menu-lines" aria-hidden="true" /></summary>
          <nav aria-label="Mobile navigation">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => { if (menu.current) menu.current.open = false; }}>{link.label}</a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
