"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Play, Shuffle, Volume2, PenTool } from "lucide-react";
import {
  HiraganaChar,
  hiraganaData,
  hiraganaRows,
  getHiraganaByRow,
} from "@/data/hiragana";
import ThemeToggle from "./ThemeToggle";
import StrokeOrderModal from "./StrokeOrderModal";

interface HiraganaSelectorProps {
  onBack: () => void;
  onStart: (data: HiraganaChar[]) => void;
}

export default function HiraganaSelector({
  onBack,
  onStart,
}: HiraganaSelectorProps) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedChars, setSelectedChars] = useState<string[]>([]);

  // Drag-to-select state for individual characters
  const gridContainerRef = useRef<HTMLDivElement | null>(null);
  const charRefMap = useRef<Map<string, HTMLButtonElement>>(new Map());
  const draggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragCurrentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectionRect, setSelectionRect] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);
  const baseSelectionRef = useRef<Set<string>>(new Set());
  const additiveModeRef = useRef(false);
  const tempSelectionRef = useRef<Set<string>>(new Set());
  const [tempSelectionTick, setTempSelectionTick] = useState(0);
  const preventClickRef = useRef(false);
  const [showStrokeModal, setShowStrokeModal] = useState(false);
  const [selectedChar, setSelectedChar] = useState<string>("");

  const toggleRow = (rowIndex: number) => {
    setSelectedRows((prev) =>
      prev.includes(rowIndex)
        ? prev.filter((i) => i !== rowIndex)
        : [...prev, rowIndex]
    );
  };

  const toggleChar = (hiragana: string) => {
    setSelectedChars((prev) =>
      prev.includes(hiragana)
        ? prev.filter((c) => c !== hiragana)
        : [...prev, hiragana]
    );
  };

  // Check if the character is a standard hiragana (has stroke order data)
  const isStandardHiragana = useCallback((char: string) => {
    const standardHiragana = [
      "あ",
      "い",
      "う",
      "え",
      "お", // a, i, u, e, o
      "か",
      "き",
      "く",
      "け",
      "こ", // ka, ki, ku, ke, ko
      "さ",
      "し",
      "す",
      "せ",
      "そ", // sa, shi, su, se, so
      "た",
      "ち",
      "つ",
      "て",
      "と", // ta, chi, tsu, te, to
      "な",
      "に",
      "ぬ",
      "ね",
      "の", // na, ni, nu, ne, no
      "は",
      "ひ",
      "ふ",
      "へ",
      "ほ", // ha, hi, fu, he, ho
      "ま",
      "み",
      "む",
      "め",
      "も", // ma, mi, mu, me, mo
      "や",
      "ゆ",
      "よ", // ya, yu, yo
      "ら",
      "り",
      "る",
      "れ",
      "ろ", // ra, ri, ru, re, ro
      "わ",
      "を",
      "ん", // wa, wo, n
    ];
    return standardHiragana.includes(char);
  }, []);

  // Audio playback function
  const speakJapanese = useCallback((text: string) => {
    try {
      if (!text) return;
      const synth =
        typeof window !== "undefined" ? window.speechSynthesis : null;
      if (!synth) return;
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      const voices = synth.getVoices();
      const jaVoice = voices.find((v) =>
        (v.lang || "").toLowerCase().startsWith("ja")
      );
      if (jaVoice) {
        utter.voice = jaVoice;
      }
      utter.lang = "ja-JP";
      utter.rate = 1;
      utter.pitch = 1;
      synth.speak(utter);
    } catch (err) {
      console.warn("Speech synthesis failed", err);
    }
  }, []);

  const handleAudioClick = (e: React.MouseEvent, hiragana: string) => {
    e.stopPropagation();
    speakJapanese(hiragana);
  };

  const handleStrokeOrderClick = (e: React.MouseEvent, hiragana: string) => {
    e.stopPropagation();
    setSelectedChar(hiragana);
    setShowStrokeModal(true);
  };

  const setCharRef = useCallback(
    (id: string) => (el: HTMLButtonElement | null) => {
      if (!el) {
        charRefMap.current.delete(id);
      } else {
        charRefMap.current.set(id, el);
      }
    },
    []
  );

  const computeSelection = useCallback(() => {
    const start = dragStartRef.current;
    const current = dragCurrentRef.current;
    const x1 = Math.min(start.x, current.x);
    const y1 = Math.min(start.y, current.y);
    const x2 = Math.max(start.x, current.x);
    const y2 = Math.max(start.y, current.y);

    const container = gridContainerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();

    setSelectionRect({
      left: x1 - containerRect.left,
      top: y1 - containerRect.top,
      width: x2 - x1,
      height: y2 - y1,
    });

    const selected = new Set<string>();
    charRefMap.current.forEach((el, id) => {
      const r = el.getBoundingClientRect();
      const intersects = !(
        r.right < x1 ||
        r.left > x2 ||
        r.bottom < y1 ||
        r.top > y2
      );
      if (intersects) {
        selected.add(id);
      }
    });

    const result = new Set<string>(
      additiveModeRef.current ? baseSelectionRef.current : []
    );
    selected.forEach((id) => result.add(id));

    tempSelectionRef.current = result;
    setTempSelectionTick((t) => t + 1);
  }, []);

  const onPointerMoveWin = useCallback(
    (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      if (Math.abs(dx) + Math.abs(dy) > 4) {
        preventClickRef.current = true;
      }
      dragCurrentRef.current = { x: e.clientX, y: e.clientY };
      computeSelection();
    },
    [computeSelection]
  );

  const onPointerUpWin = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    setSelectionRect(null);
    window.removeEventListener("pointermove", onPointerMoveWin);

    // Finalize selection
    const final = Array.from(tempSelectionRef.current);
    setSelectedChars(final);
  }, [onPointerMoveWin]);

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", onPointerMoveWin);
      window.removeEventListener("pointerup", onPointerUpWin);
    };
  }, [onPointerMoveWin, onPointerUpWin]);

  const onGridPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0) return;
      const container = gridContainerRef.current;
      if (!container) return;

      e.preventDefault();
      try {
        (e.currentTarget as any).setPointerCapture?.(e.pointerId);
      } catch {}

      additiveModeRef.current = e.shiftKey || e.metaKey || e.ctrlKey;
      baseSelectionRef.current = new Set<string>(selectedChars);

      draggingRef.current = true;
      setIsDragging(true);
      preventClickRef.current = false;
      const x = e.clientX;
      const y = e.clientY;
      dragStartRef.current = { x, y };
      dragCurrentRef.current = { x, y };
      computeSelection();

      window.addEventListener("pointermove", onPointerMoveWin);
      window.addEventListener("pointerup", onPointerUpWin, { once: true });
    },
    [computeSelection, onPointerMoveWin, onPointerUpWin, selectedChars]
  );

  const selectAll = () => {
    setSelectedRows(hiraganaRows.map((_, index) => index));
    setSelectedChars([]);
  };

  const selectNone = () => {
    setSelectedRows([]);
    setSelectedChars([]);
  };

  const getSelectedData = (): HiraganaChar[] => {
    if (selectedChars.length > 0) {
      return hiraganaData.filter((char) =>
        selectedChars.includes(char.hiragana)
      );
    }

    if (selectedRows.length > 0) {
      return hiraganaData.filter((char) => selectedRows.includes(char.row));
    }

    return hiraganaData;
  };

  const startRandom = () => {
    const allData = getSelectedData();
    const shuffled = [...allData].sort(() => 0.5 - Math.random());
    onStart(shuffled.slice(0, 20)); // Start with 20 random characters
  };

  const startSequential = () => {
    const data = getSelectedData();
    onStart(data);
  };

  const hasSelection = selectedRows.length > 0 || selectedChars.length > 0;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Kana Practice
        </h1>
        <ThemeToggle />
      </div>

      {/* Selection Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <button
            onClick={selectAll}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Select all
          </button>
          <button
            onClick={selectNone}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Clear
          </button>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Selected: {getSelectedData().length} characters
        </div>

        <div className="flex gap-4">
          <button
            onClick={startSequential}
            disabled={!hasSelection}
            className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5 mr-2" />
            Start sequential
          </button>
          <button
            onClick={startRandom}
            disabled={!hasSelection}
            className="flex items-center px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Shuffle className="w-5 h-5 mr-2" />
            Start random
          </button>
        </div>
      </div>

      {/* Hiragana Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Pick content to practice
        </h2>

        {/* Row Selection */}
        <div className="mb-6">
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
            Select by row
          </h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {hiraganaRows.map((row, index) => (
              <button
                key={index}
                onClick={() => toggleRow(index)}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  selectedRows.includes(index)
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-300"
                }`}
              >
                <div className="text-sm font-medium">Row {row}</div>
                <div className="text-xs opacity-75">
                  {getHiraganaByRow(index).length} items
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Individual Character Selection */}
        <div>
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
            Select individual characters
          </h3>
          <div
            ref={gridContainerRef}
            onPointerDown={onGridPointerDown}
            className="grid grid-cols-5 md:grid-cols-10 gap-2 relative user-select-none select-none touch-none"
          >
            {hiraganaData.map((char) => {
              const selected = isDragging
                ? tempSelectionRef.current.has(char.hiragana)
                : selectedChars.includes(char.hiragana);
              return (
                <button
                  key={char.hiragana}
                  ref={setCharRef(char.hiragana)}
                  onClick={(ev) => {
                    if (preventClickRef.current) {
                      preventClickRef.current = false;
                      return;
                    }
                    toggleChar(char.hiragana);
                  }}
                  className={`p-3 rounded-lg border-2 transition-colors relative ${
                    selected
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-green-300"
                  }`}
                >
                  <div className="text-lg japanese-text font-medium">
                    {char.hiragana}
                  </div>
                  <div className="text-xs opacity-75">{char.romaji}</div>

                  {/* Audio and stroke order buttons */}
                  <div className="absolute top-1 right-1 flex gap-1">
                    <button
                      onClick={(e) => handleAudioClick(e, char.hiragana)}
                      className={`p-1 rounded-full transition-colors ${
                        selected
                          ? "bg-white/20 hover:bg-white/30 text-white"
                          : "bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-600 dark:text-gray-300"
                      }`}
                      title="Play audio"
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                    {isStandardHiragana(char.hiragana) && (
                      <button
                        onClick={(e) =>
                          handleStrokeOrderClick(e, char.hiragana)
                        }
                        className={`p-1 rounded-full transition-colors ${
                          selected
                            ? "bg-white/20 hover:bg-white/30 text-white"
                            : "bg-amber-100 dark:bg-amber-900 hover:bg-amber-200 dark:hover:bg-amber-800 text-amber-600 dark:text-amber-300"
                        }`}
                        title="View stroke order"
                      >
                        <PenTool className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </button>
              );
            })}

            {isDragging && selectionRect && (
              <div
                className="absolute border-2 border-indigo-400 bg-indigo-500/10 pointer-events-none"
                style={{
                  left: selectionRect.left,
                  top: selectionRect.top,
                  width: selectionRect.width,
                  height: selectionRect.height,
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Stroke Order Modal */}
      <StrokeOrderModal
        open={showStrokeModal}
        onClose={() => setShowStrokeModal(false)}
        char={selectedChar}
      />
    </div>
  );
}
