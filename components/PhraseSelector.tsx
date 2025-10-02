"use client";

import React, { useState } from "react";
import { ArrowLeft, Play, Shuffle, Filter } from "lucide-react";
import { JapanesePhrase, basicPhrases, categories } from "@/data/phrases";
import ThemeToggle from "./ThemeToggle";

interface PhraseSelectorProps {
  onBack: () => void;
  onStart: (data: JapanesePhrase[]) => void;
}

export default function PhraseSelector({
  onBack,
  onStart,
}: PhraseSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "beginner" | "intermediate" | "advanced" | ""
  >("");
  // No per-phrase selection; use filters only

  const getFilteredPhrases = (): JapanesePhrase[] => {
    let filtered = basicPhrases;

    if (selectedCategory) {
      filtered = filtered.filter(
        (phrase) => phrase.category === selectedCategory
      );
    }

    if (selectedDifficulty) {
      filtered = filtered.filter(
        (phrase) => phrase.difficulty === selectedDifficulty
      );
    }

    return filtered;
  };

  const clearSelection = () => {
    setSelectedCategory("");
    setSelectedDifficulty("");
  };

  const startRandom = () => {
    const data = getFilteredPhrases();
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    onStart(shuffled.slice(0, 10)); // Start with 10 random phrases
  };

  const startSequential = () => {
    const data = getFilteredPhrases();
    onStart(data);
  };

  const filteredPhrases = getFilteredPhrases();
  const canStartSequential = filteredPhrases.length > 0;
  const canStartRandom = filteredPhrases.length > 0;

  return (
    <div className="max-w-6xl mx-auto p-4">
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
          Phrase Practice
        </h1>
        <ThemeToggle />
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-300" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Filters
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Difficulty
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as any)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Filtered: {filteredPhrases.length} phrases
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={clearSelection}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Selection Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Selected filters: {selectedCategory || "All categories"} /{" "}
          {selectedDifficulty || "All difficulties"}
        </div>

        <div className="flex gap-4">
          <button
            onClick={startSequential}
            disabled={!canStartSequential}
            className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5 mr-2" />
            Start sequential
          </button>
          <button
            onClick={startRandom}
            disabled={!canStartRandom}
            className="flex items-center px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Shuffle className="w-5 h-5 mr-2" />
            Start random
          </button>
        </div>
      </div>

      {/* Preview count */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Preview count: {filteredPhrases.length}
        </div>
        {/* Non-interactive preview list */}
        <div className="space-y-3">
          {filteredPhrases.map((phrase) => (
            <div
              key={phrase.japanese}
              className="p-4 rounded-lg border-2 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="text-xl japanese-text font-medium text-gray-800 dark:text-white">
                      {phrase.japanese}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 font-mono">
                      {phrase.romaji}
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        phrase.difficulty === "beginner"
                          ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                          : phrase.difficulty === "intermediate"
                          ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                          : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                      }`}
                    >
                      {phrase.difficulty === "beginner"
                        ? "Beginner"
                        : phrase.difficulty === "intermediate"
                        ? "Intermediate"
                        : "Advanced"}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {phrase.english}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {phrase.category}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredPhrases.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No matching phrases
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
