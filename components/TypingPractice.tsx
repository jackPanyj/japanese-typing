"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { HiraganaChar } from "@/data/hiragana";
import { JapanesePhrase } from "@/data/phrases";
import ThemeToggle from "./ThemeToggle";

interface TypingPracticeProps {
  mode: "hiragana" | "phrases";
  data: HiraganaChar[] | JapanesePhrase[];
  onComplete?: (stats: PracticeStats) => void;
  onBack?: () => void;
}

interface PracticeStats {
  totalChars: number;
  correctChars: number;
  incorrectChars: number;
  timeElapsed: number;
  wpm: number;
  accuracy: number;
}

interface TypingState {
  currentIndex: number;
  userInput: string;
  startTime: number;
  isActive: boolean;
  isCompleted: boolean;
  isAwaitingAdvance: boolean;
  stats: PracticeStats;
}

export default function TypingPractice({
  mode,
  data,
  onComplete,
  onBack,
}: TypingPracticeProps) {
  const [typingState, setTypingState] = useState<TypingState>({
    currentIndex: 0,
    userInput: "",
    startTime: 0,
    isActive: false,
    isCompleted: false,
    isAwaitingAdvance: false,
    stats: {
      totalChars: 0,
      correctChars: 0,
      incorrectChars: 0,
      timeElapsed: 0,
      wpm: 0,
      accuracy: 0,
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const advanceTimeoutRef = useRef<number | null>(null);

  const speakJapanese = useCallback((text: string) => {
    try {
      if (!text) return;
      const synth =
        typeof window !== "undefined" ? window.speechSynthesis : null;
      if (!synth) return;
      // Stop any queued or ongoing speech to avoid overlap
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
      // Non-fatal: if TTS fails, continue silently
      console.warn("Speech synthesis failed", err);
    }
  }, []);

  const getCurrentTarget = useCallback(() => {
    if (mode === "hiragana") {
      const hiraganaData = data as HiraganaChar[];
      return hiraganaData[typingState.currentIndex]?.romaji || "";
    } else {
      const phraseData = data as JapanesePhrase[];
      return phraseData[typingState.currentIndex]?.romaji || "";
    }
  }, [mode, data, typingState.currentIndex]);

  const getExpectedInput = useCallback(() => {
    if (mode === "hiragana") {
      const hiraganaData = data as HiraganaChar[];
      return hiraganaData[typingState.currentIndex]?.hiragana || "";
    } else {
      const phraseData = data as JapanesePhrase[];
      return phraseData[typingState.currentIndex]?.japanese || "";
    }
  }, [mode, data, typingState.currentIndex]);

  const getCurrentDisplay = useCallback(() => {
    if (mode === "hiragana") {
      const hiraganaData = data as HiraganaChar[];
      return hiraganaData[typingState.currentIndex]?.hiragana || "";
    } else {
      const phraseData = data as JapanesePhrase[];
      return phraseData[typingState.currentIndex]?.japanese || "";
    }
  }, [mode, data, typingState.currentIndex]);

  const getCurrentEnglish = useCallback(() => {
    if (mode === "phrases") {
      const phraseData = data as JapanesePhrase[];
      return phraseData[typingState.currentIndex]?.english || "";
    }
    return "";
  }, [mode, data, typingState.currentIndex]);

  const calculateStats = useCallback(
    (correct: number, incorrect: number, timeElapsed: number) => {
      const totalChars = correct + incorrect;
      const accuracy = totalChars > 0 ? (correct / totalChars) * 100 : 0;
      const wpm = timeElapsed > 0 ? correct / 5 / (timeElapsed / 60) : 0; // 5 characters per word average

      return {
        totalChars,
        correctChars: correct,
        incorrectChars: incorrect,
        timeElapsed,
        wpm,
        accuracy,
      };
    },
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const expected = getExpectedInput();

    if (!typingState.isActive) {
      setTypingState((prev) => ({
        ...prev,
        isActive: true,
        startTime: Date.now(),
      }));
    }

    const isCorrectNow = value === expected;

    setTypingState((prev) => {
      const newStats = {
        ...prev.stats,
        correctChars: isCorrectNow
          ? prev.stats.correctChars + 1
          : prev.stats.correctChars,
        incorrectChars:
          !isCorrectNow && value.length > 0
            ? prev.stats.incorrectChars + 1
            : prev.stats.incorrectChars,
      };

      if (isCorrectNow) {
        return {
          ...prev,
          userInput: value,
          isAwaitingAdvance: true,
          stats: newStats,
        };
      }

      return {
        ...prev,
        userInput: value,
        stats: newStats,
      };
    });

    if (isCorrectNow && advanceTimeoutRef.current === null) {
      // Play audio for the current expected Japanese text
      speakJapanese(expected);
      const nextIndex = typingState.currentIndex + 1;
      advanceTimeoutRef.current = window.setTimeout(() => {
        setTypingState((prev) => {
          if (nextIndex >= data.length) {
            const timeElapsed = (Date.now() - prev.startTime) / 1000;
            const finalStats = calculateStats(
              prev.stats.correctChars,
              prev.stats.incorrectChars,
              timeElapsed
            );

            if (onComplete) {
              onComplete(finalStats);
            }

            return {
              ...prev,
              currentIndex: nextIndex,
              userInput: "",
              isCompleted: true,
              isAwaitingAdvance: false,
              stats: finalStats,
            };
          }

          return {
            ...prev,
            currentIndex: nextIndex,
            userInput: "",
            isAwaitingAdvance: false,
          };
        });
        advanceTimeoutRef.current = null;
      }, 1500);
    }
  };

  const resetPractice = () => {
    if (advanceTimeoutRef.current !== null) {
      clearTimeout(advanceTimeoutRef.current);
      advanceTimeoutRef.current = null;
    }
    setTypingState({
      currentIndex: 0,
      userInput: "",
      startTime: 0,
      isActive: false,
      isCompleted: false,
      isAwaitingAdvance: false,
      stats: {
        totalChars: 0,
        correctChars: 0,
        incorrectChars: 0,
        timeElapsed: 0,
        wpm: 0,
        accuracy: 0,
      },
    });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [typingState.currentIndex]);

  useEffect(() => {
    return () => {
      if (advanceTimeoutRef.current !== null) {
        clearTimeout(advanceTimeoutRef.current);
        advanceTimeoutRef.current = null;
      }
    };
  }, []);

  const currentTarget = getCurrentTarget();
  const currentExpected = getExpectedInput();
  const currentDisplay = getCurrentDisplay();
  const currentEnglish = getCurrentEnglish();
  const isCorrect = typingState.userInput === currentExpected;

  if (typingState.isCompleted) {
    return (
      <div className="text-center space-y-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            disabled={!onBack}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors disabled:opacity-50"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            {mode === "hiragana" ? "Kana Practice" : "Phrase Practice"}
          </h1>
          <ThemeToggle />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Practice Complete!
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {typingState.stats.accuracy.toFixed(1)}%
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">
                Accuracy
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {typingState.stats.wpm.toFixed(1)}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                WPM
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {typingState.stats.correctChars}
              </div>
              <div className="text-sm text-purple-700 dark:text-purple-300">
                Correct chars
              </div>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {(typingState.stats.timeElapsed / 60).toFixed(1)}
              </div>
              <div className="text-sm text-orange-700 dark:text-orange-300">
                Minutes
              </div>
            </div>
          </div>

          <button
            onClick={resetPractice}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Restart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          disabled={!onBack}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          {mode === "hiragana" ? "Kana Practice" : "Phrase Practice"}
        </h1>
        <ThemeToggle />
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
          <span>
            Progress: {typingState.currentIndex + 1} / {data.length}
          </span>
          <span>
            Accuracy:{" "}
            {typingState.stats.totalChars > 0
              ? (
                  (typingState.stats.correctChars /
                    typingState.stats.totalChars) *
                  100
                ).toFixed(1)
              : 0}
            %
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((typingState.currentIndex + 1) / data.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Main Practice Area */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="mb-8">
          <div className="text-6xl japanese-text text-gray-800 dark:text-white mb-4">
            {currentDisplay}
          </div>
          {currentEnglish && (
            <div className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              {currentEnglish}
            </div>
          )}
        </div>

        <div className="mb-6">
          <input
            ref={inputRef}
            type="text"
            value={typingState.userInput}
            onChange={handleInputChange}
            placeholder="Type Japanese..."
            className={`w-full max-w-md mx-auto px-4 py-3 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              typingState.userInput && !isCorrect
                ? "border-red-300 bg-red-50 dark:bg-red-900/20"
                : typingState.userInput && isCorrect
                ? "border-green-300 bg-green-50 dark:bg-green-900/20"
                : "border-gray-300 dark:border-gray-600"
            }`}
            disabled={typingState.isCompleted || typingState.isAwaitingAdvance}
          />
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Target:{" "}
          <span className="font-mono bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 rounded">
            {currentTarget}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="font-semibold text-gray-700 dark:text-gray-300">
              正确
            </div>
            <div className="text-green-600 dark:text-green-400 font-bold">
              {typingState.stats.correctChars}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="font-semibold text-gray-700 dark:text-gray-300">
              WPM
            </div>
            <div className="text-blue-600 dark:text-blue-400 font-bold">
              {typingState.isActive
                ? calculateStats(
                    typingState.stats.correctChars,
                    typingState.stats.incorrectChars,
                    (Date.now() - typingState.startTime) / 1000
                  ).wpm.toFixed(1)
                : "0.0"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
