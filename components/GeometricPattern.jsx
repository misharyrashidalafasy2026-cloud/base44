import { useId } from "react";

// Subtle Islamic-inspired geometric star pattern as an SVG background.
export default function GeometricPattern({ className = "", opacity = 0.07, color = "currentColor" }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className={className}
      aria-hidden="true"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity }}
    >
      <defs>
        <pattern id={`geom-${id}`} width="56" height="56" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeWidth="1">
            <path d="M28 0 L56 28 L28 56 L0 28 Z" />
            <path d="M28 8 L48 28 L28 48 L8 28 Z" />
            <circle cx="28" cy="28" r="4" />
            <path d="M0 0 L8 0 M0 0 L0 8 M56 0 L48 0 M56 0 L56 8 M0 56 L8 56 M0 56 L0 48 M56 56 L48 56 M56 56 L56 48" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#geom-${id})`} />
    </svg>
  );
}