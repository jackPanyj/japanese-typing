"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { RotateCcw } from "lucide-react";

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
  const [svgMarkup, setSvgMarkup] = useState<string>("");
  const svgHostRef = useRef<HTMLDivElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const codePoint = useMemo(() => {
    if (!char) return null;
    const cp = char.codePointAt(0);
    return cp != null ? String(cp) : null;
  }, [char]);

  const triggerAnimation = useCallback(() => {
    if (!svgHostRef.current) return;
    const root = svgHostRef.current.querySelector("svg");
    if (!root) return;

    // Check if this is an AnimCJK SVG with built-in animations
    const isAnimCJK = root.classList.contains("acjk");

    if (isAnimCJK) {
      // For AnimCJK SVGs, trigger the built-in animations
      setIsAnimating(true);
      const animatedPaths = root.querySelectorAll("path[style*='--d:']");
      animatedPaths.forEach((path, idx) => {
        const delay = idx * 1000; // 1 second between strokes
        setTimeout(() => {
          // Reset and trigger the CSS animation
          (path as SVGElement).style.animation = "none";
          (path as HTMLElement).offsetHeight; // Force reflow
          (path as SVGElement).style.animation = "";
        }, delay);
      });

      // Stop animating after all strokes complete
      const totalDuration = animatedPaths.length * 1000 + 1000;
      setTimeout(() => setIsAnimating(false), totalDuration);
    } else {
      // Fallback for regular SVGs - use the original animation logic
      const nodes = Array.from(
        root.querySelectorAll("path, polyline, line")
      ) as SVGElement[];
      if (nodes.length === 0) return;

      // Order by data-order if present, else DOM order
      const ordered = nodes
        .map((el) => ({
          el,
          order: Number(
            (el.getAttribute("data-order") ||
              el.getAttribute("data-stroke") ||
              el.getAttribute("data-index") ||
              0) as any
          ),
        }))
        .sort((a, b) => a.order - b.order);
      const seq = ordered.every((o, i) => o.order === i)
        ? ordered.map((o) => o.el)
        : nodes;

      // Prepare each element for dash animation
      seq.forEach((el) => {
        const anyEl = el as any;
        if (typeof anyEl.getTotalLength !== "function") return;
        try {
          const len = anyEl.getTotalLength();
          el.setAttribute("vector-effect", "non-scaling-stroke");
          el.setAttribute("fill-opacity", "1");
          // Use inline styles to override embedded SVG <style>
          (el as SVGElement).style.fill = "none";
          (el as SVGElement).style.stroke =
            (el as SVGElement).style.stroke || "#111827";
          (el as SVGElement).style.strokeWidth =
            (el as SVGElement).style.strokeWidth || "6";
          (el as SVGElement).style.strokeDasharray = `${len}`;
          (el as SVGElement).style.strokeDashoffset = `${len}`;
          (el as SVGElement).style.transition = "none";
        } catch {}
      });

      // Force reflow to ensure initial styles are applied before animating
      void root.getBoundingClientRect();

      // Start animations on the next frame for reliable transition triggering
      requestAnimationFrame(() => {
        setIsAnimating(true);
        seq.forEach((el, idx) => {
          (el as SVGElement).style.transition =
            "stroke-dashoffset 600ms linear";
          setTimeout(() => {
            (el as SVGElement).style.strokeDashoffset = "0";
            if (idx === seq.length - 1) {
              setTimeout(() => setIsAnimating(false), 650);
            }
          }, idx * 650);
        });
      });
    }
  }, []);

  const handleReplay = () => {
    setAnimationKey((prev) => prev + 1);
    triggerAnimation();
  };

  useEffect(() => {
    if (!open || !codePoint) return;
    setSvgMarkup("");
    // Load inline SVG for animation, fallback to direct SVG image
    const svgPath = `/kana/${codePoint}.svg`;
    // Prefer inline SVG to enable animation
    fetch(svgPath)
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((text) => {
        setSvgMarkup(text);
      });
  }, [open, codePoint]);

  // After inline SVG is mounted, prepare stroke animations
  useEffect(() => {
    if (!open) return;
    if (!svgMarkup) return;
    requestAnimationFrame(() => {
      triggerAnimation();
    });
  }, [open, svgMarkup, animationKey, triggerAnimation]);

  if (!open) return null;

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
          <div className="flex items-center gap-2">
            <button
              onClick={handleReplay}
              disabled={isAnimating}
              className="px-3 py-1 text-sm rounded-md bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              title="Replay animation"
            >
              <RotateCcw className="w-4 h-4" />
              Replay
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[240px]">
          <div
            ref={svgHostRef}
            className="size-80 max-w-full"
            dangerouslySetInnerHTML={{ __html: svgMarkup }}
          />
        </div>
      </div>
    </div>
  );
}
