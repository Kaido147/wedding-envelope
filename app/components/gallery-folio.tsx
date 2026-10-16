"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState, type PointerEvent } from "react";
import type { GalleryFolio as GalleryFolioData, WeddingPhoto } from "../wedding-content";
import { Reveal } from "./reveal";

type GalleryFolioProps = {
  folios: GalleryFolioData[];
  viewerPhotos: WeddingPhoto[];
};

const swipeDistance = 48;

export function GalleryFolio({ folios, viewerPhotos }: GalleryFolioProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeFolio, setActiveFolio] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const opener = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement | null>(null);
  const rail = useRef<HTMLDivElement | null>(null);
  const pointerStart = useRef<{ id: number; x: number } | null>(null);
  const dialogId = useId();
  const selectedPhoto = selectedIndex === null ? null : viewerPhotos[selectedIndex];

  const close = useCallback(() => {
    setSelectedIndex(null);
    requestAnimationFrame(() => opener.current?.focus());
  }, []);

  const show = useCallback((index: number, target: HTMLButtonElement) => {
    opener.current = target;
    setSelectedIndex(index);
  }, []);

  const move = useCallback((direction: 1 | -1) => {
    setSelectedIndex((current) => current === null ? null : (current + direction + viewerPhotos.length) % viewerPhotos.length);
  }, [viewerPhotos.length]);

  const selectFolio = useCallback((index: number, announce = false) => {
    const nextIndex = (index + folios.length) % folios.length;
    const slide = rail.current?.children.item(nextIndex) as HTMLElement | null;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    slide?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest", inline: "center" });
    setActiveFolio(nextIndex);
    if (announce) setAnnouncement(`Folio ${String(nextIndex + 1).padStart(2, "0")} of ${String(folios.length).padStart(2, "0")}`);
  }, [folios.length]);

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const railElement = element;
    let frame: number | undefined;

    function updateActiveFolio() {
      frame = undefined;
      const firstSlide = railElement.children.item(0) as HTMLElement | null;
      if (!firstSlide) return;
      const slideWidth = firstSlide.getBoundingClientRect().width;
      const gap = Number.parseFloat(getComputedStyle(railElement).gap) || 0;
      const index = Math.max(0, Math.min(folios.length - 1, Math.round(railElement.scrollLeft / (slideWidth + gap))));
      setActiveFolio((current) => current === index ? current : index);
    }

    function onScroll() {
      if (frame === undefined) frame = requestAnimationFrame(updateActiveFolio);
    }

    railElement.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveFolio);
    return () => {
      railElement.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveFolio);
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, [folios.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") { event.preventDefault(); close(); }
      if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      if (event.key !== "Tab") return;

      const dialog = document.getElementById(dialogId);
      const controls = dialog?.querySelectorAll<HTMLElement>("button:not([disabled]), [href], [tabindex]:not([tabindex='-1'])");
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [close, dialogId, move, selectedIndex]);

  function handleViewerPointerDown(event: PointerEvent<HTMLDivElement>) {
    pointerStart.current = { id: event.pointerId, x: event.clientX };
  }

  function handleViewerPointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || start.id !== event.pointerId || Math.abs(event.clientX - start.x) < swipeDistance) return;
    move(event.clientX < start.x ? 1 : -1);
  }

  return (
    <>
      <div className="folio-list" aria-label="Prenup photograph folios">
        {folios.map((folio, folioIndex) => (
          <article className={`folio-spread folio-spread--${folioIndex % 2 === 0 ? "left" : "right"}`} key={folio.id} aria-label={`Prenup folio ${folio.id}`}>
            <span className="folio-marker" aria-hidden="true">{folio.id}<i />06</span>
            {folio.photos.map((photo, imageIndex) => {
              const viewerIndex = 2 + folioIndex * 3 + imageIndex;
              return (
                <Reveal className={`folio-print folio-print--${photo.role}`} order={imageIndex} key={photo.src}>
                  <button type="button" onClick={(event) => show(viewerIndex, event.currentTarget)} aria-label={`Open photograph ${viewerIndex + 1} of ${viewerPhotos.length}: ${photo.alt}`}>
                    <Image src={photo.src!} alt={photo.alt} fill sizes={photo.role === "feature" ? "(max-width: 1023px) 65vw, 630px" : "(max-width: 1023px) 38vw, 310px"} loading="lazy" style={{ objectFit: "cover", objectPosition: photo.position }} />
                  </button>
                </Reveal>
              );
            })}
          </article>
        ))}
      </div>

      <section className="folio-mobile" aria-label="Prenup photograph gallery">
        <p className="folio-mobile__cue" id="folio-mobile-instructions">Swipe to explore <span aria-hidden="true">→</span></p>
        <div className="folio-mobile__topline">
          <span aria-hidden="true">{String(activeFolio + 1).padStart(2, "0")} <i /> {String(folios.length).padStart(2, "0")}</span>
          <p className="sr-only" aria-live="polite">{announcement}</p>
        </div>
        <div className="folio-mobile__rail" ref={rail} aria-describedby="folio-mobile-instructions">
          {folios.map((folio, index) => {
            const photo = folio.photos[0];
            const viewerIndex = 2 + index * 3;
            return (
              <article className="folio-mobile__slide" key={folio.id} aria-label={`Folio ${folio.id} of ${folios.length}`}>
                <span className="folio-mobile__marker" aria-hidden="true">{folio.id}</span>
                <button type="button" onFocus={() => { setActiveFolio(index); setAnnouncement(`Folio ${String(index + 1).padStart(2, "0")} of ${String(folios.length).padStart(2, "0")}`); }} onClick={(event) => show(viewerIndex, event.currentTarget)} aria-label={`Open folio ${folio.id}: photograph ${viewerIndex + 1} of ${viewerPhotos.length}`}>
                  <Image src={photo.src!} alt={photo.alt} fill sizes="(max-width: 767px) 82vw, 0px" loading="lazy" style={{ objectFit: "cover", objectPosition: photo.position }} />
                </button>
              </article>
            );
          })}
        </div>
        <div className="folio-mobile__navigation" aria-label="Folio navigation">
          <button type="button" onClick={() => selectFolio(activeFolio - 1, true)} aria-label="Previous folio"><span aria-hidden="true">←</span> Previous</button>
          <button type="button" onClick={() => selectFolio(activeFolio + 1, true)} aria-label="Next folio">Next <span aria-hidden="true">→</span></button>
        </div>
        <button className="folio-mobile__all" type="button" onClick={(event) => show(0, event.currentTarget)}>View all {viewerPhotos.length} photographs <span aria-hidden="true">↗</span></button>
      </section>

      <noscript>
        <div className="folio-noscript" aria-label="All prenup photographs">
          {viewerPhotos.map((photo) => <Image key={photo.src} src={photo.src!} alt={photo.alt} width={800} height={1000} sizes="(max-width: 767px) 100vw, 33vw" loading="lazy" />)}
        </div>
      </noscript>

      {selectedPhoto && selectedIndex !== null ? (
        <div className="folio-lightbox" id={dialogId} role="dialog" aria-modal="true" aria-label={`Photograph ${selectedIndex + 1} of ${viewerPhotos.length}`}>
          <button className="folio-lightbox__backdrop" type="button" aria-label="Close photograph viewer" onClick={close} />
          <div className="folio-lightbox__content">
            <div className="folio-lightbox__toolbar">
              <span>{String(selectedIndex + 1).padStart(2, "0")} / {String(viewerPhotos.length).padStart(2, "0")}</span>
              <button ref={closeButton} type="button" onClick={close} aria-label="Close photograph viewer">Close <span aria-hidden="true">×</span></button>
            </div>
            <div className="folio-lightbox__image" onPointerDown={handleViewerPointerDown} onPointerUp={handleViewerPointerUp} onPointerCancel={() => { pointerStart.current = null; }}>
              <Image src={selectedPhoto.src!} alt={selectedPhoto.alt} fill sizes="100vw" priority style={{ objectFit: "contain", objectPosition: selectedPhoto.position }} />
            </div>
            <div className="folio-lightbox__controls">
              <button type="button" onClick={() => move(-1)} aria-label="Previous photograph"><span aria-hidden="true">←</span> Previous</button>
              <button type="button" onClick={() => move(1)} aria-label="Next photograph">Next <span aria-hidden="true">→</span></button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
