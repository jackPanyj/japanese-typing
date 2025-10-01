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

  // が行 (濁音)
  { hiragana: "が", romaji: "ga", row: 10, column: 0 },
  { hiragana: "ぎ", romaji: "gi", row: 10, column: 1 },
  { hiragana: "ぐ", romaji: "gu", row: 10, column: 2 },
  { hiragana: "げ", romaji: "ge", row: 10, column: 3 },
  { hiragana: "ご", romaji: "go", row: 10, column: 4 },

  // ざ行 (濁音)
  { hiragana: "ざ", romaji: "za", row: 11, column: 0 },
  { hiragana: "じ", romaji: "ji", row: 11, column: 1 },
  { hiragana: "ず", romaji: "zu", row: 11, column: 2 },
  { hiragana: "ぜ", romaji: "ze", row: 11, column: 3 },
  { hiragana: "ぞ", romaji: "zo", row: 11, column: 4 },

  // だ行 (濁音)
  { hiragana: "だ", romaji: "da", row: 12, column: 0 },
  { hiragana: "ぢ", romaji: "ji", row: 12, column: 1 },
  { hiragana: "づ", romaji: "zu", row: 12, column: 2 },
  { hiragana: "で", romaji: "de", row: 12, column: 3 },
  { hiragana: "ど", romaji: "do", row: 12, column: 4 },

  // ば行 (濁音)
  { hiragana: "ば", romaji: "ba", row: 13, column: 0 },
  { hiragana: "び", romaji: "bi", row: 13, column: 1 },
  { hiragana: "ぶ", romaji: "bu", row: 13, column: 2 },
  { hiragana: "べ", romaji: "be", row: 13, column: 3 },
  { hiragana: "ぼ", romaji: "bo", row: 13, column: 4 },

  // ぱ行 (半濁音)
  { hiragana: "ぱ", romaji: "pa", row: 14, column: 0 },
  { hiragana: "ぴ", romaji: "pi", row: 14, column: 1 },
  { hiragana: "ぷ", romaji: "pu", row: 14, column: 2 },
  { hiragana: "ぺ", romaji: "pe", row: 14, column: 3 },
  { hiragana: "ぽ", romaji: "po", row: 14, column: 4 },

  // きゃ行 (拗音)
  { hiragana: "きゃ", romaji: "kya", row: 15, column: 0 },
  { hiragana: "きゅ", romaji: "kyu", row: 15, column: 2 },
  { hiragana: "きょ", romaji: "kyo", row: 15, column: 4 },

  // しゃ行 (拗音)
  { hiragana: "しゃ", romaji: "sha", row: 16, column: 0 },
  { hiragana: "しゅ", romaji: "shu", row: 16, column: 2 },
  { hiragana: "しょ", romaji: "sho", row: 16, column: 4 },

  // ちゃ行 (拗音)
  { hiragana: "ちゃ", romaji: "cha", row: 17, column: 0 },
  { hiragana: "ちゅ", romaji: "chu", row: 17, column: 2 },
  { hiragana: "ちょ", romaji: "cho", row: 17, column: 4 },

  // にゃ行 (拗音)
  { hiragana: "にゃ", romaji: "nya", row: 18, column: 0 },
  { hiragana: "にゅ", romaji: "nyu", row: 18, column: 2 },
  { hiragana: "にょ", romaji: "nyo", row: 18, column: 4 },

  // ひゃ行 (拗音)
  { hiragana: "ひゃ", romaji: "hya", row: 19, column: 0 },
  { hiragana: "ひゅ", romaji: "hyu", row: 19, column: 2 },
  { hiragana: "ひょ", romaji: "hyo", row: 19, column: 4 },

  // みゃ行 (拗音)
  { hiragana: "みゃ", romaji: "mya", row: 20, column: 0 },
  { hiragana: "みゅ", romaji: "myu", row: 20, column: 2 },
  { hiragana: "みょ", romaji: "myo", row: 20, column: 4 },

  // りゃ行 (拗音)
  { hiragana: "りゃ", romaji: "rya", row: 21, column: 0 },
  { hiragana: "りゅ", romaji: "ryu", row: 21, column: 2 },
  { hiragana: "りょ", romaji: "ryo", row: 21, column: 4 },

  // ぎゃ行 (拗音・濁音)
  { hiragana: "ぎゃ", romaji: "gya", row: 22, column: 0 },
  { hiragana: "ぎゅ", romaji: "gyu", row: 22, column: 2 },
  { hiragana: "ぎょ", romaji: "gyo", row: 22, column: 4 },

  // じゃ行 (拗音・濁音)
  { hiragana: "じゃ", romaji: "ja", row: 23, column: 0 },
  { hiragana: "じゅ", romaji: "ju", row: 23, column: 2 },
  { hiragana: "じょ", romaji: "jo", row: 23, column: 4 },

  // びゃ行 (拗音・濁音)
  { hiragana: "びゃ", romaji: "bya", row: 24, column: 0 },
  { hiragana: "びゅ", romaji: "byu", row: 24, column: 2 },
  { hiragana: "びょ", romaji: "byo", row: 24, column: 4 },

  // ぴゃ行 (拗音・半濁音)
  { hiragana: "ぴゃ", romaji: "pya", row: 25, column: 0 },
  { hiragana: "ぴゅ", romaji: "pyu", row: 25, column: 2 },
  { hiragana: "ぴょ", romaji: "pyo", row: 25, column: 4 },
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
  "が",
  "ざ",
  "だ",
  "ば",
  "ぱ",
  "きゃ",
  "しゃ",
  "ちゃ",
  "にゃ",
  "ひゃ",
  "みゃ",
  "りゃ",
  "ぎゃ",
  "じゃ",
  "びゃ",
  "ぴゃ",
];

export const getHiraganaByRow = (rowIndex: number): HiraganaChar[] => {
  return hiraganaData.filter((char) => char.row === rowIndex);
};

export const getRandomHiragana = (count: number = 1): HiraganaChar[] => {
  const shuffled = [...hiraganaData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
