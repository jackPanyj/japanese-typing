"use client";

import React, { useState } from "react";
import { ArrowLeft, Play, Shuffle, Filter } from "lucide-react";
import {
  JapanesePhrase,
  basicPhrases,
  categories,
  getPhrasesByCategory,
  getPhrasesByDifficulty,
} from "@/data/phrases";
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
  const [selectedPhrases, setSelectedPhrases] = useState<string[]>([]);

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

    if (selectedPhrases.length > 0) {
      filtered = filtered.filter((phrase) =>
        selectedPhrases.includes(phrase.japanese)
      );
    }

    return filtered;
  };

  const togglePhrase = (japanese: string) => {
    setSelectedPhrases((prev) =>
      prev.includes(japanese)
        ? prev.filter((p) => p !== japanese)
        : [...prev, japanese]
    );
  };

  const selectAllFiltered = () => {
    const filtered = getFilteredPhrases();
    setSelectedPhrases(filtered.map((phrase) => phrase.japanese));
  };

  const clearSelection = () => {
    setSelectedPhrases([]);
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
  const hasSelection =
    selectedPhrases.length > 0 || selectedCategory || selectedDifficulty;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          返回
        </button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          短语练习
        </h1>
        <ThemeToggle />
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-300" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            筛选选项
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              分类
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">全部分类</option>
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
              难度
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as any)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">全部难度</option>
              <option value="beginner">初级</option>
              <option value="intermediate">中级</option>
              <option value="advanced">高级</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          筛选结果: {filteredPhrases.length} 个短语
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={selectAllFiltered}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            全选筛选结果
          </button>
          <button
            onClick={clearSelection}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            清空选择
          </button>
        </div>
      </div>

      {/* Selection Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          已选择: {selectedPhrases.length} 个短语
        </div>

        <div className="flex gap-4">
          <button
            onClick={startSequential}
            disabled={!hasSelection}
            className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5 mr-2" />
            顺序练习
          </button>
          <button
            onClick={startRandom}
            disabled={!hasSelection}
            className="flex items-center px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Shuffle className="w-5 h-5 mr-2" />
            随机练习
          </button>
        </div>
      </div>

      {/* Phrases List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          选择练习短语
        </h2>

        <div className="space-y-3">
          {filteredPhrases.map((phrase) => (
            <div
              key={phrase.japanese}
              className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                selectedPhrases.includes(phrase.japanese)
                  ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600"
                  : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-green-300"
              }`}
              onClick={() => togglePhrase(phrase.japanese)}
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
                        ? "初级"
                        : phrase.difficulty === "intermediate"
                        ? "中级"
                        : "高级"}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {phrase.english}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {phrase.category}
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedPhrases.includes(phrase.japanese)
                      ? "bg-green-500 border-green-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {selectedPhrases.includes(phrase.japanese) && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPhrases.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            没有找到匹配的短语
          </div>
        )}
      </div>
    </div>
  );
}
