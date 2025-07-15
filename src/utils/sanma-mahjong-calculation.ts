import {
  sanmaKoRonPointMaps,
  sanmaKoTsumoKoPointMaps,
  sanmaKoTsumoOyaPointMaps,
  sanmaOyaRonPointMaps,
  sanmaOyaTsumoPointMaps,
  sanmaLimitHanPoints,
  sanmaLimitNames,
} from "../constants/calculation/sanma-score-table";

export interface SanmaScoreInfo {
  oyaRon: string;
  oyaTsumo: string;
  coRon: string;
  coTsumo: string;
}

// 符数の調整
export const adjustFu = (fu: number): number => {
  if (fu === 20) {
    return 20; // 平和ツモ
  }

  if (fu === 25) {
    return 25; // 七対子
  }

  // 10符単位で切り上げ、最低30符、最高110符
  const adjustedFu = Math.max(30, Math.ceil(fu / 10) * 10);
  return Math.min(adjustedFu, 110); // 110符を上限とする
};

// 満貫以上の点数を取得
const getLimitHandScore = (han: number): SanmaScoreInfo | null => {
  // prettier-ignore
  for (const [minHan, maxHan, coRon, coTsumoKo, coTsumoOya, oyaRon, oyaTsumo] of sanmaLimitHanPoints) {
    if (han >= minHan && han <= maxHan) {
      return {
        oyaRon: oyaRon.toString(),
        oyaTsumo: `${oyaTsumo.toString()} All`,
        coRon: coRon.toString(),
        coTsumo: `${coTsumoOya.toString()} / ${coTsumoKo.toString()}`,
      };
    }
  }
  return null;
};

// 通常の点数（1-4翻）を取得
const getNormalScore = (
  han: number,
  adjustedFu: number
): SanmaScoreInfo | null => {
  const oyaRon = sanmaOyaRonPointMaps[han]?.[adjustedFu];
  const oyaTsumo = sanmaOyaTsumoPointMaps[han]?.[adjustedFu];
  const coRon = sanmaKoRonPointMaps[han]?.[adjustedFu];
  const coTsumoOya = sanmaKoTsumoOyaPointMaps[han]?.[adjustedFu];
  const coTsumoKo = sanmaKoTsumoKoPointMaps[han]?.[adjustedFu];

  return {
    oyaRon: oyaRon != null ? oyaRon.toString() : "null",
    oyaTsumo: oyaTsumo != null ? `${oyaTsumo.toString()} All` : "null",
    coRon: coRon != null ? coRon.toString() : "null",
    coTsumo:
      coTsumoOya != null && coTsumoKo != null
        ? `${coTsumoOya.toString()} / ${coTsumoKo.toString()}`
        : "null",
  };
};

// 翻数と符数から全ての点数情報を取得
export const getSanmaAllScores = (han: number, fu: number): SanmaScoreInfo => {
  // 翻数が0の場合
  if (han === 0) {
    return { oyaRon: "0", oyaTsumo: "0", coRon: "0", coTsumo: "0" };
  }

  // 満貫以上の場合（5翻以上）
  if (han >= 5) {
    const limitScore = getLimitHandScore(han);
    if (limitScore) {
      return limitScore;
    }
  }

  // 通常の点数（1-4翻）
  const adjustedFu = adjustFu(fu);
  const normalScore = getNormalScore(han, adjustedFu);

  if (normalScore) {
    return normalScore;
  }

  // 無効な組み合わせ
  return { oyaRon: "0", oyaTsumo: "0", coRon: "0", coTsumo: "0" };
};

// 満貫以上の名称を取得
export const getLimitName = (han: number): string => {
  if (han === 0) return "";

  // 満貫以上の名称を逆順で確認（高い翻数から）
  const sortedLimits = Object.entries(sanmaLimitNames)
    .map(([hanStr, name]) => [parseInt(hanStr), name] as const)
    .sort(([a], [b]) => b - a);

  for (const [limitHan, name] of sortedLimits) {
    if (han >= limitHan) {
      return name;
    }
  }

  return "";
};
