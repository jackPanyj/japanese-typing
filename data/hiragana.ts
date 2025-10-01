export interface HiraganaChar {
  hiragana: string;
  romaji: string;
  row: number;
  column: number;
}

export const hiraganaData: HiraganaChar[] = [
  // あ行
  { hiragana: "あ", romaji: "a", row: 0, column: 0 },
  { hiragana: "い", romaji: "i", row: 0, column: 1 },
  { hiragana: "う", romaji: "u", row: 0, column: 2 },
  { hiragana: "え", romaji: "e", row: 0, column: 3 },
  { hiragana: "お", romaji: "o", row: 0, column: 4 },

  // か行
  { hiragana: "か", romaji: "ka", row: 1, column: 0 },
  { hiragana: "き", romaji: "ki", row: 1, column: 1 },
  { hiragana: "く", romaji: "ku", row: 1, column: 2 },
  { hiragana: "け", romaji: "ke", row: 1, column: 3 },
  { hiragana: "こ", romaji: "ko", row: 1, column: 4 },

  // さ行
  { hiragana: "さ", romaji: "sa", row: 2, column: 0 },
  { hiragana: "し", romaji: "shi", row: 2, column: 1 },
  { hiragana: "す", romaji: "su", row: 2, column: 2 },
  { hiragana: "せ", romaji: "se", row: 2, column: 3 },
  { hiragana: "そ", romaji: "so", row: 2, column: 4 },

  // た行
  { hiragana: "た", romaji: "ta", row: 3, column: 0 },
  { hiragana: "ち", romaji: "chi", row: 3, column: 1 },
  { hiragana: "つ", romaji: "tsu", row: 3, column: 2 },
  { hiragana: "て", romaji: "te", row: 3, column: 3 },
  { hiragana: "と", romaji: "to", row: 3, column: 4 },

  // な行
  { hiragana: "な", romaji: "na", row: 4, column: 0 },
  { hiragana: "に", romaji: "ni", row: 4, column: 1 },
  { hiragana: "ぬ", romaji: "nu", row: 4, column: 2 },
  { hiragana: "ね", romaji: "ne", row: 4, column: 3 },
  { hiragana: "の", romaji: "no", row: 4, column: 4 },

  // は行
  { hiragana: "は", romaji: "ha", row: 5, column: 0 },
  { hiragana: "ひ", romaji: "hi", row: 5, column: 1 },
  { hiragana: "ふ", romaji: "fu", row: 5, column: 2 },
  { hiragana: "へ", romaji: "he", row: 5, column: 3 },
  { hiragana: "ほ", romaji: "ho", row: 5, column: 4 },

  // ま行
  { hiragana: "ま", romaji: "ma", row: 6, column: 0 },
  { hiragana: "み", romaji: "mi", row: 6, column: 1 },
  { hiragana: "む", romaji: "mu", row: 6, column: 2 },
  { hiragana: "め", romaji: "me", row: 6, column: 3 },
  { hiragana: "も", romaji: "mo", row: 6, column: 4 },

  // や行
  { hiragana: "や", romaji: "ya", row: 7, column: 0 },
  { hiragana: "ゆ", romaji: "yu", row: 7, column: 2 },
  { hiragana: "よ", romaji: "yo", row: 7, column: 4 },

  // ら行
  { hiragana: "ら", romaji: "ra", row: 8, column: 0 },
  { hiragana: "り", romaji: "ri", row: 8, column: 1 },
  { hiragana: "る", romaji: "ru", row: 8, column: 2 },
  { hiragana: "れ", romaji: "re", row: 8, column: 3 },
  { hiragana: "ろ", romaji: "ro", row: 8, column: 4 },

  // わ行
  { hiragana: "わ", romaji: "wa", row: 9, column: 0 },
  { hiragana: "を", romaji: "wo", row: 9, column: 2 },
  { hiragana: "ん", romaji: "n", row: 9, column: 4 },
];

export const hiraganaRows = [
  "あ",
  "か",
  "さ",
  "た",
  "な",
  "は",
  "ま",
  "や",
  "ら",
  "わ",
];

export const getHiraganaByRow = (rowIndex: number): HiraganaChar[] => {
  return hiraganaData.filter((char) => char.row === rowIndex);
};

export const getRandomHiragana = (count: number = 1): HiraganaChar[] => {
  const shuffled = [...hiraganaData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
