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
      title: "五十音练习",
      description: "练习日语五十音图的罗马字输入",
      icon: BookOpen,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
    },
    {
      id: "phrases" as const,
      title: "短语练习",
      description: "练习常用日语短语和表达",
      icon: MessageSquare,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
    },
    {
      id: "settings" as const,
      title: "设置",
      description: "自定义练习选项和难度",
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
            日语打字练习
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            通过打字练习来学习日语五十音和常用短语，提高你的日语输入技能
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
            功能特色
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                实时统计
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                显示打字速度、准确率和进度
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                分级练习
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                从基础五十音到实用短语
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                实用内容
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                学习日常对话和常用表达
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <Settings className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                个性化
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                自定义练习难度和内容
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
