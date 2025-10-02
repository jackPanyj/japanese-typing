export interface JapanesePhrase {
  japanese: string;
  romaji: string;
  english: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export const basicPhrases: JapanesePhrase[] = [
  // Greetings
  {
    japanese: "こんにちは",
    romaji: "konnichiwa",
    english: "Hello (Good afternoon)",
    category: "Greetings",
    difficulty: "beginner",
  },
  {
    japanese: "おはようございます",
    romaji: "ohayou gozaimasu",
    english: "Good morning",
    category: "Greetings",
    difficulty: "beginner",
  },
  {
    japanese: "こんばんは",
    romaji: "konbanwa",
    english: "Good evening",
    category: "Greetings",
    difficulty: "beginner",
  },
  {
    japanese: "さようなら",
    romaji: "sayounara",
    english: "Goodbye",
    category: "Greetings",
    difficulty: "beginner",
  },
  {
    japanese: "ありがとう",
    romaji: "arigatou",
    english: "Thank you",
    category: "Greetings",
    difficulty: "beginner",
  },
  {
    japanese: "すみません",
    romaji: "sumimasen",
    english: "Excuse me / Sorry",
    category: "Greetings",
    difficulty: "beginner",
  },
  {
    japanese: "ありがとうございます",
    romaji: "arigatou gozaimasu",
    english: "Thank you (polite)",
    category: "Greetings",
    difficulty: "beginner",
  },
  {
    japanese: "お元気ですか",
    romaji: "ogenki desu ka",
    english: "How are you?",
    category: "Greetings",
    difficulty: "beginner",
  },
  {
    japanese: "はじめまして",
    romaji: "hajimemashite",
    english: "Nice to meet you",
    category: "Greetings",
    difficulty: "beginner",
  },

  // Self-introduction
  {
    japanese: "わたしは",
    romaji: "watashi wa",
    english: "I am",
    category: "Self-introduction",
    difficulty: "beginner",
  },
  {
    japanese: "あなたは",
    romaji: "anata wa",
    english: "You are",
    category: "Self-introduction",
    difficulty: "beginner",
  },
  {
    japanese: "よろしくおねがいします",
    romaji: "yoroshiku onegaishimasu",
    english: "Please treat me well",
    category: "Self-introduction",
    difficulty: "intermediate",
  },
  {
    japanese: "わたしのなまえは〜です",
    romaji: "watashi no namae wa ~ desu",
    english: "My name is ~",
    category: "Self-introduction",
    difficulty: "beginner",
  },
  {
    japanese: "〜からきました",
    romaji: "~ kara kimashita",
    english: "I came from ~",
    category: "Self-introduction",
    difficulty: "intermediate",
  },

  // Numbers
  {
    japanese: "いち",
    romaji: "ichi",
    english: "One",
    category: "Numbers",
    difficulty: "beginner",
  },
  {
    japanese: "に",
    romaji: "ni",
    english: "Two",
    category: "Numbers",
    difficulty: "beginner",
  },
  {
    japanese: "さん",
    romaji: "san",
    english: "Three",
    category: "Numbers",
    difficulty: "beginner",
  },
  {
    japanese: "よん",
    romaji: "yon",
    english: "Four",
    category: "Numbers",
    difficulty: "beginner",
  },
  {
    japanese: "ご",
    romaji: "go",
    english: "Five",
    category: "Numbers",
    difficulty: "beginner",
  },
  {
    japanese: "ろく",
    romaji: "roku",
    english: "Six",
    category: "Numbers",
    difficulty: "beginner",
  },
  {
    japanese: "なな",
    romaji: "nana",
    english: "Seven",
    category: "Numbers",
    difficulty: "beginner",
  },
  {
    japanese: "はち",
    romaji: "hachi",
    english: "Eight",
    category: "Numbers",
    difficulty: "beginner",
  },
  {
    japanese: "きゅう",
    romaji: "kyuu",
    english: "Nine",
    category: "Numbers",
    difficulty: "beginner",
  },
  {
    japanese: "じゅう",
    romaji: "juu",
    english: "Ten",
    category: "Numbers",
    difficulty: "beginner",
  },
  {
    japanese: "ひゃく",
    romaji: "hyaku",
    english: "One hundred",
    category: "Numbers",
    difficulty: "intermediate",
  },
  {
    japanese: "せん",
    romaji: "sen",
    english: "One thousand",
    category: "Numbers",
    difficulty: "intermediate",
  },

  // Basic vocabulary
  {
    japanese: "みず",
    romaji: "mizu",
    english: "Water",
    category: "Basic vocabulary",
    difficulty: "beginner",
  },
  {
    japanese: "たべもの",
    romaji: "tabemono",
    english: "Food",
    category: "Basic vocabulary",
    difficulty: "beginner",
  },
  {
    japanese: "いえ",
    romaji: "ie",
    english: "House",
    category: "Basic vocabulary",
    difficulty: "beginner",
  },
  {
    japanese: "くるま",
    romaji: "kuruma",
    english: "Car",
    category: "Basic vocabulary",
    difficulty: "beginner",
  },
  {
    japanese: "ほん",
    romaji: "hon",
    english: "Book",
    category: "Basic vocabulary",
    difficulty: "beginner",
  },
  {
    japanese: "がっこう",
    romaji: "gakkou",
    english: "School",
    category: "Basic vocabulary",
    difficulty: "beginner",
  },
  {
    japanese: "せんせい",
    romaji: "sensei",
    english: "Teacher",
    category: "Basic vocabulary",
    difficulty: "beginner",
  },
  {
    japanese: "がくせい",
    romaji: "gakusei",
    english: "Student",
    category: "Basic vocabulary",
    difficulty: "beginner",
  },
  {
    japanese: "でんしゃ",
    romaji: "densha",
    english: "Train",
    category: "Basic vocabulary",
    difficulty: "beginner",
  },

  // Time
  {
    japanese: "いま",
    romaji: "ima",
    english: "Now",
    category: "Time",
    difficulty: "beginner",
  },
  {
    japanese: "きょう",
    romaji: "kyou",
    english: "Today",
    category: "Time",
    difficulty: "beginner",
  },
  {
    japanese: "あした",
    romaji: "ashita",
    english: "Tomorrow",
    category: "Time",
    difficulty: "beginner",
  },
  {
    japanese: "きのう",
    romaji: "kinou",
    english: "Yesterday",
    category: "Time",
    difficulty: "beginner",
  },
  {
    japanese: "なんじですか",
    romaji: "nanji desu ka",
    english: "What time is it?",
    category: "Time",
    difficulty: "intermediate",
  },
  {
    japanese: "ごぜん",
    romaji: "gozen",
    english: "A.M.",
    category: "Time",
    difficulty: "beginner",
  },
  {
    japanese: "ごご",
    romaji: "gogo",
    english: "P.M.",
    category: "Time",
    difficulty: "beginner",
  },

  // Common expressions
  {
    japanese: "はい",
    romaji: "hai",
    english: "Yes",
    category: "Common expressions",
    difficulty: "beginner",
  },
  {
    japanese: "いいえ",
    romaji: "iie",
    english: "No",
    category: "Common expressions",
    difficulty: "beginner",
  },
  {
    japanese: "わかりません",
    romaji: "wakarimasen",
    english: "I don't understand",
    category: "Common expressions",
    difficulty: "intermediate",
  },
  {
    japanese: "だいじょうぶ",
    romaji: "daijoubu",
    english: "It's okay",
    category: "Common expressions",
    difficulty: "intermediate",
  },
  {
    japanese: "お願いします",
    romaji: "onegaishimasu",
    english: "Please",
    category: "Common expressions",
    difficulty: "beginner",
  },
  {
    japanese: "どこですか",
    romaji: "doko desu ka",
    english: "Where is it?",
    category: "Common expressions",
    difficulty: "beginner",
  },
  {
    japanese: "いくらですか",
    romaji: "ikura desu ka",
    english: "How much is it?",
    category: "Common expressions",
    difficulty: "beginner",
  },

  // Travel
  {
    japanese: "えきはどこですか",
    romaji: "eki wa doko desu ka",
    english: "Where is the station?",
    category: "Travel",
    difficulty: "beginner",
  },
  {
    japanese: "ホテルをよやくしました",
    romaji: "hoteru o yoyaku shimashita",
    english: "I reserved a hotel",
    category: "Travel",
    difficulty: "intermediate",
  },
  {
    japanese: "ちずをください",
    romaji: "chizu o kudasai",
    english: "Please give me a map",
    category: "Travel",
    difficulty: "beginner",
  },

  // Food & Drink
  {
    japanese: "おすすめはなんですか",
    romaji: "osusume wa nan desu ka",
    english: "What do you recommend?",
    category: "Food & Drink",
    difficulty: "intermediate",
  },
  {
    japanese: "みずをください",
    romaji: "mizu o kudasai",
    english: "Water, please",
    category: "Food & Drink",
    difficulty: "beginner",
  },
  {
    japanese: "おいしいです",
    romaji: "oishii desu",
    english: "It's delicious",
    category: "Food & Drink",
    difficulty: "beginner",
  },

  // Shopping
  {
    japanese: "これをください",
    romaji: "kore o kudasai",
    english: "This one, please",
    category: "Shopping",
    difficulty: "beginner",
  },
  {
    japanese: "べつのいろはありますか",
    romaji: "betsu no iro wa arimasu ka",
    english: "Do you have another color?",
    category: "Shopping",
    difficulty: "intermediate",
  },
  {
    japanese: "カードはつかえますか",
    romaji: "kaado wa tsukaemasu ka",
    english: "Can I use a card?",
    category: "Shopping",
    difficulty: "intermediate",
  },

  // Directions
  {
    japanese: "みぎにまがってください",
    romaji: "migi ni magatte kudasai",
    english: "Please turn right",
    category: "Directions",
    difficulty: "intermediate",
  },
  {
    japanese: "まっすぐいってください",
    romaji: "massugu itte kudasai",
    english: "Go straight, please",
    category: "Directions",
    difficulty: "beginner",
  },
  {
    japanese: "ここでとめてください",
    romaji: "koko de tomete kudasai",
    english: "Please stop here",
    category: "Directions",
    difficulty: "beginner",
  },

  // Questions
  {
    japanese: "これはなんですか",
    romaji: "kore wa nan desu ka",
    english: "What is this?",
    category: "Questions",
    difficulty: "beginner",
  },
  {
    japanese: "だれですか",
    romaji: "dare desu ka",
    english: "Who is it?",
    category: "Questions",
    difficulty: "beginner",
  },
  {
    japanese: "どこからきましたか",
    romaji: "doko kara kimashita ka",
    english: "Where are you from?",
    category: "Questions",
    difficulty: "beginner",
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
