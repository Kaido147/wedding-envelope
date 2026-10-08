import Image from "next/image";
import type { WeddingPhoto } from "../wedding-content";

export function PhotoPanel({ photo, variant = "portrait" }: {
  photo: WeddingPhoto;
  variant?: "portrait" | "story";
}) {
  return (
    <div className={`photo-panel photo-panel--${variant}`}>
      {photo.src ? (
        <Image src={photo.src} alt={photo.alt} fill
          sizes="(max-width: 767px) 80vw, 420px"
          loading={variant === "portrait" ? "eager" : "lazy"}
          style={{ objectFit: "cover", objectPosition: photo.position }} />
      ) : (
        <div className="photo-placeholder" role="img" aria-label={`${photo.label} placeholder`}>
          <span className="placeholder-monogram" aria-hidden="true">K<span>&</span>T</span>
          <span className="placeholder-label" aria-hidden="true">{photo.label}</span>
        </div>
      )}
    </div>
  );
}
