"use client";

import { useEffect, useRef, useState } from "react";

type PlaybackState = "paused" | "playing" | "unavailable";

export function BackgroundMusic({ src, title, volume }: {
  src: string;
  title: string;
  volume: number;
}) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playback, setPlayback] = useState<PlaybackState>("paused");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const player = audio.current;
    if (!player) return;

    player.volume = Math.min(Math.max(volume, 0), 1);
    let active = true;
    void player.play().catch(() => {
      if (active) setPlayback("paused");
    });
    return () => { active = false; };
  }, [volume]);

  async function togglePlayback() {
    const player = audio.current;
    if (!player || playback === "unavailable") return;

    setStatus("");
    if (playback === "playing") {
      player.pause();
      return;
    }

    try {
      await player.play();
    } catch {
      setPlayback("paused");
      setStatus("Music could not be played. Please try again.");
    }
  }

  const unavailable = playback === "unavailable";
  const playing = playback === "playing";
  const label = unavailable
    ? "Music unavailable"
    : playing
      ? `Pause ${title}`
      : `Play ${title}`;

  return (
    <>
      <audio
        ref={audio}
        src={src}
        preload="auto"
        loop
        onPlay={() => { setPlayback("playing"); setStatus(""); }}
        onPause={() => setPlayback((current) => current === "unavailable" ? current : "paused")}
        onEnded={() => setPlayback((current) => current === "unavailable" ? current : "paused")}
        onError={() => {
          setPlayback("unavailable");
          setStatus("Music is currently unavailable.");
        }}
      />
      <button
        type="button"
        className="music-control"
        onClick={togglePlayback}
        disabled={unavailable}
        aria-label={label}
        aria-pressed={playing}
        title={label}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M7.5 5.5v13M16.5 5.5v13" />
          </svg>
        ) : (
          <svg className="music-control-play" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="m8 5 11 7-11 7Z" />
          </svg>
        )}
      </button>
      <span className="sr-only" role="status" aria-live="polite">{status}</span>
    </>
  );
}
