"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

interface StrokeOrderModalProps {
  open: boolean;
  onClose: () => void;
  char: string;
}

export default function StrokeOrderModal({
  open,
  onClose,
  char,
}: StrokeOrderModalProps) {
  const [src, setSrc] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [svgMarkup, setSvgMarkup] = useState<string>("");
  const svgHostRef = useRef<HTMLDivElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const encoded = useMemo(() => encodeURIComponent(char), [char]);

  useEffect(() => {
    if (!open) return;
    setError(false);
    setSvgMarkup("");
    // Try svg first, then png
    const svgPath = `/strokes/hiragana/${encoded}.svg`;
    const pngPath = `/strokes/hiragana/${encoded}.png`;
    // Prefer inline SVG to enable animation
    fetch(svgPath)
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((text) => {
        setSvgMarkup(text);
        setSrc("");
      })
      .catch(() => {
        const img = new Image();
        img.onload = () => setSrc(svgPath);
        img.onerror = () => {
          const img2 = new Image();
          img2.onload = () => setSrc(pngPath);
          img2.onerror = () => setError(true);
          img2.src = pngPath;
        };
        img.src = svgPath;
      });
  }, [open, encoded]);

  // After inline SVG is mounted, prepare stroke animations
  useEffect(() => {
    if (!open) return;
    if (!svgMarkup) return;
    setTimeout(() => {
      if (!svgHostRef.current) return;
      const root = svgHostRef.current.querySelector("svg");
      if (!root) return;
      // Ensure stroke styles applied
      const paths = Array.from(
        root.querySelectorAll("path")
      ) as SVGPathElement[];
      if (paths.length === 0) return;
      // Order by data-order if present, else DOM order
      const ordered = paths
        .map((p) => ({
          el: p,
          order: Number(
            (p.getAttribute("data-order") ||
              p.getAttribute("data-stroke") ||
              p.getAttribute("data-index") ||
              0) as any
          ),
        }))
        .sort((a, b) => a.order - b.order);
      const seq = ordered.every((o, i) => o.order === i)
        ? ordered.map((o) => o.el)
        : paths;

      // Prepare each path for dash animation
      seq.forEach((p) => {
        try {
          const len = p.getTotalLength();
          p.setAttribute("fill", "none");
          if (!p.getAttribute("stroke")) p.setAttribute("stroke", "#111827");
          if (!p.getAttribute("stroke-width"))
            p.setAttribute("stroke-width", "6");
          p.style.strokeDasharray = `${len}`;
          p.style.strokeDashoffset = `${len}`;
          p.style.transition = "stroke-dashoffset 600ms linear";
        } catch {}
      });

      // Play sequentially
      let delay = 0;
      setIsAnimating(true);
      seq.forEach((p, idx) => {
        setTimeout(() => {
          p.style.strokeDashoffset = "0";
          if (idx === seq.length - 1) {
            setTimeout(() => setIsAnimating(false), 650);
          }
        }, delay);
        delay += 650; // 600ms + small gap
      });
    }, 0);
  }, [open, svgMarkup]);

  if (!open) return null;

  const downloadGeneratedSvg = () => {
    const size = 400;
    const svg =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">\n` +
      `  <defs>\n` +
      `    <style><![CDATA[ .ch { font-family: 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Meiryo', sans-serif; font-weight: 700; } ]]></style>\n` +
      `  </defs>\n` +
      `  <rect x="0" y="0" width="${size}" height="${size}" fill="#ffffff"/>\n` +
      `  <g stroke="#e5e7eb" stroke-width="1">\n` +
      `    <line x1="0" y1="${size / 2}" x2="${size}" y2="${size / 2}"/>\n` +
      `    <line x1="${size / 2}" y1="0" x2="${size / 2}" y2="${size}"/>\n` +
      `    <rect x="4" y="4" width="${size - 8}" height="${
        size - 8
      }" fill="none" stroke="#d1d5db"/>\n` +
      `  </g>\n` +
      `  <text class="ch" x="50%" y="55%" font-size="280" text-anchor="middle" dominant-baseline="middle" fill="#111827">${char}</text>\n` +
      `  <text x="50%" y="${
        size - 16
      }" font-size="14" text-anchor="middle" fill="#6b7280">Stroke order placeholder</text>\n` +
      `</svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${char}.svg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Stroke order
          </h3>
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Close
          </button>
        </div>
        <div className="flex items-center justify-center min-h-[240px]">
          {svgMarkup ? (
            <div
              ref={svgHostRef}
              className="max-h-80 max-w-full [&>svg]:max-h-80 [&>svg]:max-w-full"
              // We trust local assets; ensure assets are from /public
              dangerouslySetInnerHTML={{ __html: svgMarkup }}
            />
          ) : !error && src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={`Stroke order for ${char}`}
              className="max-h-80 object-contain"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 400 400"
              width={320}
              height={320}
              className="border border-gray-200 dark:border-gray-700 rounded"
            >
              <rect x="0" y="0" width="400" height="400" fill="#ffffff" />
              <g stroke="#e5e7eb" strokeWidth="1">
                <line x1="0" y1="200" x2="400" y2="200" />
                <line x1="200" y1="0" x2="200" y2="400" />
                <rect
                  x="4"
                  y="4"
                  width="392"
                  height="392"
                  fill="none"
                  stroke="#d1d5db"
                />
              </g>
              <text
                x="200"
                y="220"
                fontSize="280"
                textAnchor="middle"
                fill="#111827"
                className="ch"
              >
                {char}
              </text>
              <text
                x="200"
                y="384"
                fontSize="14"
                textAnchor="middle"
                fill="#6b7280"
              >
                Stroke order placeholder
              </text>
            </svg>
          )}
        </div>
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          Place stroke diagrams at /public/strokes/hiragana/{encoded}.svg (or
          .png).{" "}
          {error && (
            <>
              {" "}
              | Or click
              <button onClick={downloadGeneratedSvg} className="ml-1 underline">
                download placeholder SVG
              </button>
              .
            </>
          )}
          {svgMarkup && (
            <>
              {" "}
              |{" "}
              <button
                className="underline"
                onClick={() => {
                  // replay animation
                  setSvgMarkup((prev) => prev);
                }}
              >
                Replay
              </button>
              {isAnimating ? " (playing...)" : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
