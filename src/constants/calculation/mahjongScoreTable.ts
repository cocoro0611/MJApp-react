/**
 * 麻雀点数表の設定
 * 翻数と符数の組み合わせごとに点数を定義
 */

// 点数情報の型定義
export interface ScoreInfo {
  oyaRon: string; // 親のロン
  oyaTsumo: string; // 親のツモ
  coRon: string; // 子のロン
  coTsumo: string; // 子のツモ
}

// 符数ごとの点数設定
interface FuScores {
  [fu: number]: ScoreInfo;
}

// 翻数ごとの設定
interface HanScores {
  [han: number]: FuScores;
}

/**
 * 麻雀点数表
 * han → fu → 点数情報の階層構造
 */
export const MAHJONG_SCORE_TABLE: HanScores = {
  // 1翻
  1: {
    30: {
      oyaRon: "1500",
      oyaTsumo: "500オール",
      coRon: "1000",
      coTsumo: "500/300",
    },
    40: {
      oyaRon: "2000",
      oyaTsumo: "700オール",
      coRon: "1300",
      coTsumo: "700/400",
    },
    50: {
      oyaRon: "2400",
      oyaTsumo: "800オール",
      coRon: "1600",
      coTsumo: "800/400",
    },
    60: {
      oyaRon: "2900",
      oyaTsumo: "1000オール",
      coRon: "1900",
      coTsumo: "1000/500",
    },
    70: {
      oyaRon: "3400",
      oyaTsumo: "1200オール",
      coRon: "2300",
      coTsumo: "1200/600",
    },
    80: {
      oyaRon: "3900",
      oyaTsumo: "1300オール",
      coRon: "2600",
      coTsumo: "1300/700",
    },
    90: {
      oyaRon: "4400",
      oyaTsumo: "1500オール",
      coRon: "2900",
      coTsumo: "1500/800",
    },
    100: {
      oyaRon: "4800",
      oyaTsumo: "1600オール",
      coRon: "3200",
      coTsumo: "1600/800",
    },
    110: {
      oyaRon: "5300",
      oyaTsumo: "1800オール",
      coRon: "3500",
      coTsumo: "1800/900",
    },
  },

  // 2翻
  2: {
    20: {
      oyaRon: "2000", // 平和ツモ
      oyaTsumo: "700オール",
      coRon: "1300",
      coTsumo: "700/400",
    },
    25: {
      oyaRon: "2400", // 七対子
      oyaTsumo: "800オール",
      coRon: "1600",
      coTsumo: "800/400",
    },
    30: {
      oyaRon: "2900",
      oyaTsumo: "1000オール",
      coRon: "1900",
      coTsumo: "1000/500",
    },
    40: {
      oyaRon: "3900",
      oyaTsumo: "1300オール",
      coRon: "2600",
      coTsumo: "1300/700",
    },
    50: {
      oyaRon: "4800",
      oyaTsumo: "1600オール",
      coRon: "3200",
      coTsumo: "1600/800",
    },
    60: {
      oyaRon: "5800",
      oyaTsumo: "2000オール",
      coRon: "3900",
      coTsumo: "2000/1000",
    },
    70: {
      oyaRon: "6800",
      oyaTsumo: "2300オール",
      coRon: "4500",
      coTsumo: "2300/1200",
    },
    80: {
      oyaRon: "7700",
      oyaTsumo: "2600オール",
      coRon: "5200",
      coTsumo: "2600/1300",
    },
    90: {
      oyaRon: "8700",
      oyaTsumo: "2900オール",
      coRon: "5800",
      coTsumo: "2900/1500",
    },
    100: {
      oyaRon: "9600",
      oyaTsumo: "3200オール",
      coRon: "6400",
      coTsumo: "3200/1600",
    },
    110: {
      oyaRon: "10600",
      oyaTsumo: "3600オール",
      coRon: "7100",
      coTsumo: "3600/1800",
    },
  },

  // 3翻
  3: {
    20: {
      oyaRon: "3900", // 平和ツモ
      oyaTsumo: "1300オール",
      coRon: "2600",
      coTsumo: "1300/700",
    },
    25: {
      oyaRon: "4800", // 七対子
      oyaTsumo: "1600オール",
      coRon: "3200",
      coTsumo: "1600/800",
    },
    30: {
      oyaRon: "5800",
      oyaTsumo: "2000オール",
      coRon: "3900",
      coTsumo: "2000/1000",
    },
    40: {
      oyaRon: "7700",
      oyaTsumo: "2600オール",
      coRon: "5200",
      coTsumo: "2600/1300",
    },
    50: {
      oyaRon: "9600",
      oyaTsumo: "3200オール",
      coRon: "6400",
      coTsumo: "3200/1600",
    },
    60: {
      oyaRon: "12000", // 満貫
      oyaTsumo: "4000オール",
      coRon: "8000",
      coTsumo: "4000/2000",
    },
  },

  // 4翻
  4: {
    20: {
      oyaRon: "7700", // 平和ツモ
      oyaTsumo: "2600オール",
      coRon: "5200",
      coTsumo: "2600/1300",
    },
    25: {
      oyaRon: "9600", // 七対子
      oyaTsumo: "3200オール",
      coRon: "6400",
      coTsumo: "3200/1600",
    },
    30: {
      oyaRon: "11600",
      oyaTsumo: "3900オール",
      coRon: "7700",
      coTsumo: "3900/2000",
    },
    40: {
      oyaRon: "12000", // 満貫扱い
      oyaTsumo: "4000オール",
      coRon: "8000",
      coTsumo: "4000/2000",
    },
  },

  // 5翻以上（満貫系）
  5: {
    0: {
      // 符数関係なし
      oyaRon: "12000", // 満貫
      oyaTsumo: "4000オール",
      coRon: "8000",
      coTsumo: "4000/2000",
    },
  },

  6: {
    0: {
      // 符数関係なし
      oyaRon: "18000", // 跳満
      oyaTsumo: "6000オール",
      coRon: "12000",
      coTsumo: "6000/3000",
    },
  },

  7: {
    0: {
      // 符数関係なし
      oyaRon: "18000", // 跳満
      oyaTsumo: "6000オール",
      coRon: "12000",
      coTsumo: "6000/3000",
    },
  },

  8: {
    0: {
      // 符数関係なし
      oyaRon: "24000", // 倍満
      oyaTsumo: "8000オール",
      coRon: "16000",
      coTsumo: "8000/4000",
    },
  },

  9: {
    0: {
      // 符数関係なし
      oyaRon: "24000", // 倍満
      oyaTsumo: "8000オール",
      coRon: "16000",
      coTsumo: "8000/4000",
    },
  },

  10: {
    0: {
      // 符数関係なし
      oyaRon: "24000", // 倍満
      oyaTsumo: "8000オール",
      coRon: "16000",
      coTsumo: "8000/4000",
    },
  },

  11: {
    0: {
      // 符数関係なし
      oyaRon: "36000", // 三倍満
      oyaTsumo: "12000オール",
      coRon: "24000",
      coTsumo: "12000/6000",
    },
  },

  12: {
    0: {
      // 符数関係なし
      oyaRon: "36000", // 三倍満
      oyaTsumo: "12000オール",
      coRon: "24000",
      coTsumo: "12000/6000",
    },
  },

  13: {
    0: {
      // 符数関係なし
      oyaRon: "48000", // 数え役満
      oyaTsumo: "16000オール",
      coRon: "32000",
      coTsumo: "16000/8000",
    },
  },
};
