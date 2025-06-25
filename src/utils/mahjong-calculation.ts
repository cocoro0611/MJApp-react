/**
 * 麻雀点数計算関数
 * 点数表を参照して計算を行う
 */

import {
  koRonPointMaps,
  koTsumoKoPointMaps,
  koTsumoOyaPointMaps,
  oyaRonPointMaps,
  oyaTsumoPointMaps,
  limitHanPoints,
  limitNames,
} from "../constants/calculation/score-table";

// 点数情報の型定義
export interface ScoreInfo {
  oyaRon: string; // 親のロン
  oyaTsumo: string; // 親のツモ
  coRon: string; // 子のロン
  coTsumo: string; // 子のツモ
}

/**
 * 符数を調整する
 * @param fu 入力された符数
 * @returns 調整された符数
 */
function adjustFu(fu: number): number {
  if (fu === 0) {
    return 20; // 平和ツモ
  }

  if (fu === 25) {
    return 25; // 七対子
  }

  // 10符単位で切り上げ、最低30符
  return Math.max(30, Math.ceil(fu / 10) * 10);
}

/**
 * 満貫以上の点数を取得
 * @param han 翻数
 * @returns 満貫以上の点数情報、該当しない場合はnull
 */
function getLimitHandScore(han: number): ScoreInfo | null {
  for (const [
    minHan,
    maxHan,
    coRon,
    coTsumoKo,
    coTsumoOya,
    oyaRon,
    oyaTsumo,
  ] of limitHanPoints) {
    if (han >= minHan && han <= maxHan) {
      return {
        oyaRon: oyaRon.toLocaleString(),
        oyaTsumo: `${oyaTsumo.toLocaleString()}オール`,
        coRon: coRon.toLocaleString(),
        coTsumo: `${coTsumoOya.toLocaleString()}/${coTsumoKo.toLocaleString()}`,
      };
    }
  }
  return null;
}

/**
 * 通常の点数（1-4翻）を取得
 * @param han 翻数
 * @param adjustedFu 調整済み符数
 * @returns 点数情報、無効な場合はnull
 */
function getNormalScore(han: number, adjustedFu: number): ScoreInfo | null {
  const coRon = koRonPointMaps[han]?.[adjustedFu];
  const coTsumoKo = koTsumoKoPointMaps[han]?.[adjustedFu];
  const coTsumoOya = koTsumoOyaPointMaps[han]?.[adjustedFu];
  const oyaRon = oyaRonPointMaps[han]?.[adjustedFu];
  const oyaTsumo = oyaTsumoPointMaps[han]?.[adjustedFu];

  // いずれかがnullの場合は無効
  if (
    coRon === null ||
    coTsumoKo === null ||
    coTsumoOya === null ||
    oyaRon === null ||
    oyaTsumo === null ||
    coRon === undefined ||
    coTsumoKo === undefined ||
    coTsumoOya === undefined ||
    oyaRon === undefined ||
    oyaTsumo === undefined
  ) {
    return null;
  }

  return {
    oyaRon: oyaRon.toLocaleString(),
    oyaTsumo: `${oyaTsumo.toLocaleString()}オール`,
    coRon: coRon.toLocaleString(),
    coTsumo: `${coTsumoOya.toLocaleString()}/${coTsumoKo.toLocaleString()}`,
  };
}

/**
 * 翻数と符数から全ての点数情報を取得
 * @param han 翻数
 * @param fu 符数
 * @returns 全ての点数情報
 */
export function getAllScores(han: number, fu: number): ScoreInfo {
  // 翻数が0の場合
  if (han === 0) {
    return {
      oyaRon: "0",
      oyaTsumo: "0",
      coRon: "0",
      coTsumo: "0",
    };
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
  return {
    oyaRon: "0",
    oyaTsumo: "0",
    coRon: "0",
    coTsumo: "0",
  };
}

/**
 * 満貫以上の名称を取得
 * @param han 翻数
 * @returns 満貫、跳満などの名称
 */
export function getLimitName(han: number): string {
  if (han === 0) return "";

  // 満貫以上の名称を逆順で確認（高い翻数から）
  const sortedLimits = Object.entries(limitNames)
    .map(([hanStr, name]) => [parseInt(hanStr), name] as const)
    .sort(([a], [b]) => b - a);

  for (const [limitHan, name] of sortedLimits) {
    if (han >= limitHan) {
      return name;
    }
  }

  return "";
}

/**
 * 子のロン点数のみを取得
 * @param han 翻数
 * @param fu 符数
 * @returns 子のロン点数（数値）、無効な場合はnull
 */
export function getKoRonScore(han: number, fu: number): number | null {
  if (han === 0) return null;

  if (han >= 5) {
    const limitScore = getLimitHandScore(han);
    if (limitScore) {
      return parseInt(limitScore.coRon.replace(/,/g, ""));
    }
  }

  const adjustedFu = adjustFu(fu);
  return koRonPointMaps[han]?.[adjustedFu] ?? null;
}

/**
 * 親のロン点数のみを取得
 * @param han 翻数
 * @param fu 符数
 * @returns 親のロン点数（数値）、無効な場合はnull
 */
export function getOyaRonScore(han: number, fu: number): number | null {
  if (han === 0) return null;

  if (han >= 5) {
    const limitScore = getLimitHandScore(han);
    if (limitScore) {
      return parseInt(limitScore.oyaRon.replace(/,/g, ""));
    }
  }

  const adjustedFu = adjustFu(fu);
  return oyaRonPointMaps[han]?.[adjustedFu] ?? null;
}

/**
 * 子のツモ点数（親の支払い分）のみを取得
 * @param han 翻数
 * @param fu 符数
 * @returns 子のツモ時の親の支払い点数（数値）、無効な場合はnull
 */
export function getKoTsumoOyaScore(han: number, fu: number): number | null {
  if (han === 0) return null;

  if (han >= 5) {
    for (const [minHan, maxHan, , , coTsumoOya] of limitHanPoints) {
      if (han >= minHan && han <= maxHan) {
        return coTsumoOya;
      }
    }
  }

  const adjustedFu = adjustFu(fu);
  return koTsumoOyaPointMaps[han]?.[adjustedFu] ?? null;
}

/**
 * 子のツモ点数（子の支払い分）のみを取得
 * @param han 翻数
 * @param fu 符数
 * @returns 子のツモ時の子の支払い点数（数値）、無効な場合はnull
 */
export function getKoTsumoKoScore(han: number, fu: number): number | null {
  if (han === 0) return null;

  if (han >= 5) {
    for (const [minHan, maxHan, , coTsumoKo] of limitHanPoints) {
      if (han >= minHan && han <= maxHan) {
        return coTsumoKo;
      }
    }
  }

  const adjustedFu = adjustFu(fu);
  return koTsumoKoPointMaps[han]?.[adjustedFu] ?? null;
}

/**
 * 親のツモ点数のみを取得
 * @param han 翻数
 * @param fu 符数
 * @returns 親のツモ点数（数値）、無効な場合はnull
 */
export function getOyaTsumoScore(han: number, fu: number): number | null {
  if (han === 0) return null;

  if (han >= 5) {
    for (const [minHan, maxHan, , , , , oyaTsumo] of limitHanPoints) {
      if (han >= minHan && han <= maxHan) {
        return oyaTsumo;
      }
    }
  }

  const adjustedFu = adjustFu(fu);
  return oyaTsumoPointMaps[han]?.[adjustedFu] ?? null;
}

/**
 * 有効な符数一覧を取得
 * @param han 翻数
 * @returns 有効な符数の配列
 */
export function getValidFuList(han: number): number[] {
  if (han >= 5) {
    return [0]; // 満貫以上は符数関係なし
  }

  const hanMap = koRonPointMaps[han];
  if (!hanMap) return [];

  return Object.keys(hanMap)
    .map(Number)
    .filter((fu) => hanMap[fu] !== null)
    .sort((a, b) => a - b);
}
