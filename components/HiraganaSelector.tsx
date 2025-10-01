"use client";

import React, { useState } from "react";
import { ArrowLeft, Play, Shuffle } from "lucide-react";
import {
  HiraganaChar,
  hiraganaData,
  hiraganaRows,
  getHiraganaByRow,
} from "@/data/hiragana";
import ThemeToggle from "./ThemeToggle";

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
          返回
        </button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          五十音练习
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
            全选
          </button>
          <button
            onClick={selectNone}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            清空
          </button>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          已选择: {getSelectedData().length} 个字符
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

      {/* Hiragana Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          选择练习内容
        </h2>

        {/* Row Selection */}
        <div className="mb-6">
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
            按行选择
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
                <div className="text-sm font-medium">{row}行</div>
                <div className="text-xs opacity-75">
                  {getHiraganaByRow(index).length}个
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Individual Character Selection */}
        <div>
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
            单独选择字符
          </h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {hiraganaData.map((char) => (
              <button
                key={char.hiragana}
                onClick={() => toggleChar(char.hiragana)}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  selectedChars.includes(char.hiragana)
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-green-300"
                }`}
              >
                <div className="text-lg japanese-text font-medium">
                  {char.hiragana}
                </div>
                <div className="text-xs opacity-75">{char.romaji}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
