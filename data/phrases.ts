export interface JapanesePhrase {
  japanese: string;
  romaji: string;
  english: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export const basicPhrases: JapanesePhrase[] = [
  // 问候语
  {
    japanese: "こんにちは",
    romaji: "konnichiwa",
    english: "Hello (Good afternoon)",
    category: "问候",
    difficulty: "beginner",
  },
  {
    japanese: "おはようございます",
    romaji: "ohayou gozaimasu",
    english: "Good morning",
    category: "问候",
    difficulty: "beginner",
  },
  {
    japanese: "こんばんは",
    romaji: "konbanwa",
    english: "Good evening",
    category: "问候",
    difficulty: "beginner",
  },
  {
    japanese: "さようなら",
    romaji: "sayounara",
    english: "Goodbye",
    category: "问候",
    difficulty: "beginner",
  },
  {
    japanese: "ありがとう",
    romaji: "arigatou",
    english: "Thank you",
    category: "问候",
    difficulty: "beginner",
  },
  {
    japanese: "すみません",
    romaji: "sumimasen",
    english: "Excuse me / Sorry",
    category: "问候",
    difficulty: "beginner",
  },

  // 自我介绍
  {
    japanese: "わたしは",
    romaji: "watashi wa",
    english: "I am",
    category: "自我介绍",
    difficulty: "beginner",
  },
  {
    japanese: "あなたは",
    romaji: "anata wa",
    english: "You are",
    category: "自我介绍",
    difficulty: "beginner",
  },
  {
    japanese: "はじめまして",
    romaji: "hajimemashite",
    english: "Nice to meet you",
    category: "自我介绍",
    difficulty: "beginner",
  },
  {
    japanese: "よろしくおねがいします",
    romaji: "yoroshiku onegaishimasu",
    english: "Please treat me well",
    category: "自我介绍",
    difficulty: "intermediate",
  },

  // 数字
  {
    japanese: "いち",
    romaji: "ichi",
    english: "One",
    category: "数字",
    difficulty: "beginner",
  },
  {
    japanese: "に",
    romaji: "ni",
    english: "Two",
    category: "数字",
    difficulty: "beginner",
  },
  {
    japanese: "さん",
    romaji: "san",
    english: "Three",
    category: "数字",
    difficulty: "beginner",
  },
  {
    japanese: "よん",
    romaji: "yon",
    english: "Four",
    category: "数字",
    difficulty: "beginner",
  },
  {
    japanese: "ご",
    romaji: "go",
    english: "Five",
    category: "数字",
    difficulty: "beginner",
  },
  {
    japanese: "ろく",
    romaji: "roku",
    english: "Six",
    category: "数字",
    difficulty: "beginner",
  },
  {
    japanese: "なな",
    romaji: "nana",
    english: "Seven",
    category: "数字",
    difficulty: "beginner",
  },
  {
    japanese: "はち",
    romaji: "hachi",
    english: "Eight",
    category: "数字",
    difficulty: "beginner",
  },
  {
    japanese: "きゅう",
    romaji: "kyuu",
    english: "Nine",
    category: "数字",
    difficulty: "beginner",
  },
  {
    japanese: "じゅう",
    romaji: "juu",
    english: "Ten",
    category: "数字",
    difficulty: "beginner",
  },

  // 基本词汇
  {
    japanese: "みず",
    romaji: "mizu",
    english: "Water",
    category: "基本词汇",
    difficulty: "beginner",
  },
  {
    japanese: "たべもの",
    romaji: "tabemono",
    english: "Food",
    category: "基本词汇",
    difficulty: "beginner",
  },
  {
    japanese: "いえ",
    romaji: "ie",
    english: "House",
    category: "基本词汇",
    difficulty: "beginner",
  },
  {
    japanese: "くるま",
    romaji: "kuruma",
    english: "Car",
    category: "基本词汇",
    difficulty: "beginner",
  },
  {
    japanese: "ほん",
    romaji: "hon",
    english: "Book",
    category: "基本词汇",
    difficulty: "beginner",
  },
  {
    japanese: "がっこう",
    romaji: "gakkou",
    english: "School",
    category: "基本词汇",
    difficulty: "beginner",
  },

  // 时间
  {
    japanese: "いま",
    romaji: "ima",
    english: "Now",
    category: "时间",
    difficulty: "beginner",
  },
  {
    japanese: "きょう",
    romaji: "kyou",
    english: "Today",
    category: "时间",
    difficulty: "beginner",
  },
  {
    japanese: "あした",
    romaji: "ashita",
    english: "Tomorrow",
    category: "时间",
    difficulty: "beginner",
  },
  {
    japanese: "きのう",
    romaji: "kinou",
    english: "Yesterday",
    category: "时间",
    difficulty: "beginner",
  },

  // 常用表达
  {
    japanese: "はい",
    romaji: "hai",
    english: "Yes",
    category: "常用表达",
    difficulty: "beginner",
  },
  {
    japanese: "いいえ",
    romaji: "iie",
    english: "No",
    category: "常用表达",
    difficulty: "beginner",
  },
  {
    japanese: "わかりません",
    romaji: "wakarimasen",
    english: "I don't understand",
    category: "常用表达",
    difficulty: "intermediate",
  },
  {
    japanese: "だいじょうぶ",
    romaji: "daijoubu",
    english: "It's okay",
    category: "常用表达",
    difficulty: "intermediate",
  },
];

export const getPhrasesByCategory = (category: string): JapanesePhrase[] => {
  return basicPhrases.filter((phrase) => phrase.category === category);
};

export const getPhrasesByDifficulty = (
  difficulty: "beginner" | "intermediate" | "advanced"
): JapanesePhrase[] => {
  return basicPhrases.filter((phrase) => phrase.difficulty === difficulty);
};

export const getRandomPhrases = (count: number = 5): JapanesePhrase[] => {
  const shuffled = [...basicPhrases].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const categories = Array.from(
  new Set(basicPhrases.map((phrase) => phrase.category))
);
