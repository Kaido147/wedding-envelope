"use client";

import { useSyncExternalStore } from "react";

const desktopQuery = "(min-width: 768px)";
function subscribe(callback: () => void) {
  const query = window.matchMedia(desktopQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
function getSnapshot() {
  return window.matchMedia(desktopQuery).matches;
}
function getServerSnapshot() {
  return false;
}

export function Entourage({ groups }: {
  groups: readonly { readonly role: string; readonly names: readonly string[] }[];
}) {
  const desktop = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <div className="entourage-grid">
      {groups.map((group) => (
        <details className="entourage-group" key={group.role} open={desktop}>
          <summary>
            <span>{group.role}</span>
            <span className="disclosure-mark" aria-hidden="true" />
          </summary>
          <ul className={group.names.length > 2 ? "entourage-names entourage-names--long" : "entourage-names"}>
            {group.names.map((name) => <li key={name}>{name}</li>)}
          </ul>
        </details>
      ))}
    </div>
  );
}
