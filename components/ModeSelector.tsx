"use client";

import React from "react";
import { BookOpen, MessageSquare, Settings, Trophy } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface ModeSelectorProps {
  onModeSelect: (mode: "hiragana" | "phrases" | "settings") => void;
}

export default function ModeSelector({ onModeSelect }: ModeSelectorProps) {
  const modes = [
    {
      id: "hiragana" as const,
      title: "Kana Practice",
      description: "Practice Japanese kana input",
      icon: BookOpen,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
    },
    {
      id: "phrases" as const,
      title: "Phrase Practice",
      description: "Practice common Japanese phrases",
      icon: MessageSquare,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
    },
    {
      id: "settings" as const,
      title: "Settings",
      description: "Customize options and difficulty",
      icon: Settings,
      color: "bg-gray-500",
      hoverColor: "hover:bg-gray-600",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Japanese Typing Practice
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Learn Japanese kana and common phrases through typing.
          </p>
        </div>

        {/* Mode Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {modes.map((mode) => {
            const IconComponent = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => onModeSelect(mode.id)}
                className={`${mode.color} ${mode.hoverColor} text-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group`}
              >
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <IconComponent className="w-12 h-12 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{mode.title}</h3>
                  <p className="text-sm opacity-90">{mode.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Features */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                Live stats
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Track speed, accuracy, and progress
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                Leveled practice
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                From basic kana to useful phrases
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                Practical content
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Learn daily conversations and expressions
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <Settings className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                Personalization
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Customize difficulty and content
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
