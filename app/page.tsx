"use client";

import React, { useState } from "react";
import ModeSelector from "@/components/ModeSelector";
import HiraganaSelector from "@/components/HiraganaSelector";
import PhraseSelector from "@/components/PhraseSelector";
import TypingPractice from "@/components/TypingPractice";
import { HiraganaChar } from "@/data/hiragana";
import { JapanesePhrase } from "@/data/phrases";

type AppState =
  | "mode-select"
  | "hiragana-select"
  | "phrase-select"
  | "hiragana-practice"
  | "phrase-practice";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("mode-select");
  const [practiceData, setPracticeData] = useState<
    HiraganaChar[] | JapanesePhrase[]
  >([]);

  const handleModeSelect = (mode: "hiragana" | "phrases" | "settings") => {
    if (mode === "hiragana") {
      setAppState("hiragana-select");
    } else if (mode === "phrases") {
      setAppState("phrase-select");
    } else if (mode === "settings") {
      // TODO: Implement settings
      console.log("Settings not implemented yet");
    }
  };

  const handleBack = () => {
    setAppState("mode-select");
    setPracticeData([]);
  };

  const handleHiraganaStart = (data: HiraganaChar[]) => {
    setPracticeData(data);
    setAppState("hiragana-practice");
  };

  const handlePhraseStart = (data: JapanesePhrase[]) => {
    setPracticeData(data);
    setAppState("phrase-practice");
  };

  const handlePracticeComplete = () => {
    // Could add statistics tracking here
    console.log("Practice completed");
  };

  const renderCurrentState = () => {
    switch (appState) {
      case "mode-select":
        return <ModeSelector onModeSelect={handleModeSelect} />;

      case "hiragana-select":
        return (
          <HiraganaSelector onBack={handleBack} onStart={handleHiraganaStart} />
        );

      case "phrase-select":
        return (
          <PhraseSelector onBack={handleBack} onStart={handlePhraseStart} />
        );

      case "hiragana-practice":
        return (
          <TypingPractice
            mode="hiragana"
            data={practiceData as HiraganaChar[]}
            onBack={handleBack}
            onComplete={handlePracticeComplete}
          />
        );

      case "phrase-practice":
        return (
          <TypingPractice
            mode="phrases"
            data={practiceData as JapanesePhrase[]}
            onBack={handleBack}
            onComplete={handlePracticeComplete}
          />
        );

      default:
        return <ModeSelector onModeSelect={handleModeSelect} />;
    }
  };

  return <main className="min-h-screen">{renderCurrentState()}</main>;
}
