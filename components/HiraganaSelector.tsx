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

  const [showStrokeModal, setShowStrokeModal] = useState(false);
  const [selectedChar, setSelectedChar] = useState<string>("");

  const toggleRow = (rowIndex: number) => {
    setSelectedRows((prev) =>
      prev.includes(rowIndex)
        ? prev.filter((i) => i !== rowIndex)
        : [...prev, rowIndex]
    );
  };

  // Individual character selection disabled by request

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

  // Drag-to-select removed by request

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

  // Grouping for display-only individual characters
  const baseRows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const voicedRows = [10, 11, 12, 13, 14];
  const youonRows = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

  const baseChars = hiraganaData.filter((c) => baseRows.includes(c.row));
  const voicedChars = hiraganaData.filter((c) => voicedRows.includes(c.row));
  const youonChars = hiraganaData.filter((c) => youonRows.includes(c.row));

  const renderCharCard = (char: HiraganaChar) => (
    <button
      key={char.hiragana}
      onClick={() => speakJapanese(char.hiragana)}
      className={`p-3 rounded-lg border-2 transition-colors relative bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600`}
    >
      <div className="text-lg japanese-text font-medium">{char.hiragana}</div>
      <div className="text-xs opacity-75">{char.romaji}</div>

      {/* Stroke order icon (left) and audio icon (right) */}
      {isStandardHiragana(char.hiragana) && (
        <div
          onClick={(e) => handleStrokeOrderClick(e, char.hiragana)}
          className={`absolute top-1 left-1 p-1 rounded-full transition-colors cursor-pointer bg-amber-100 dark:bg-amber-900 hover:bg-amber-200 dark:hover:bg-amber-800 text-amber-600 dark:text-amber-300`}
          title="View stroke order"
        >
          <PenTool className="w-3 h-3" />
        </div>
      )}
      <div
        onClick={(e) => handleAudioClick(e, char.hiragana)}
        className={`absolute top-1 right-1 p-1 rounded-full transition-colors cursor-pointer bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-600 dark:text-gray-300`}
        title="Play audio"
      >
        <Volume2 className="w-3 h-3" />
      </div>
    </button>
  );

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

        {/* Individual Character Selection (grouped) */}
        <div>
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
            Select individual characters
          </h3>

          {/* Basic gojuon */}
          <div className="mb-6">
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
              Basic gojuon
            </div>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {baseChars.map(renderCharCard)}
            </div>
          </div>

          {/* Voiced / Semi-voiced */}
          <div className="mb-6">
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
              Voiced / Semi-voiced
            </div>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {voicedChars.map(renderCharCard)}
            </div>
          </div>

          {/* Contracted sounds (youon) */}
          <div>
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
              Contracted sounds (youon)
            </div>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {youonChars.map(renderCharCard)}
            </div>
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
