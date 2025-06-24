import {
  MAHJONG_SCORE_TABLE,
  ScoreInfo,
} from "../constants/calculation/mahjongScoreTable";

/**
 * 麻雀点数計算ユーティリティ
 * 翻数と符数から点数表を参照して点数を取得
 */

// 全ての点数情報を含む結果型
export interface AllScoreResult {
  oyaRon: string; // 親のロン
  oyaTsumo: string; // 親のツモ
  coRon: string; // 子のロン
  coTsumo: string; // 子のツモ
  han: number; // 翻数
  fu: number; // 符数
  isValid: boolean; // 有効な組み合わせかどうか
  limitName?: string; // 満貫、跳満などの名称
}

/**
 * 翻数と符数から全ての点数情報を取得
 * @param han 翻数
 * @param fu 符数
 * @returns 全ての点数情報
 */
export const getAllScores = (han: number, fu: number): AllScoreResult => {
  // 翻数が0の場合は無効
  if (han === 0) {
    return {
      oyaRon: "0",
      oyaTsumo: "0",
      coRon: "0",
      coTsumo: "0",
      han,
      fu,
      isValid: false,
    };
  }

  // 満貫以上の場合（5翻以上）
  if (han >= 5) {
    const limitName = getLimitName(han);
    const scoreInfo =
      MAHJONG_SCORE_TABLE[han]?.[0] || MAHJONG_SCORE_TABLE[13][0]; // 13翻以上は数え役満

    return {
      ...scoreInfo,
      han,
      fu,
      isValid: true,
      limitName,
    };
  }

  // 通常の点数（1-4翻）
  const hanScores = MAHJONG_SCORE_TABLE[han];
  if (!hanScores) {
    return {
      oyaRon: "0",
      oyaTsumo: "0",
      coRon: "0",
      coTsumo: "0",
      han,
      fu,
      isValid: false,
    };
  }

  // 符数の調整
  let adjustedFu = fu;

  // 符数が0の場合、平和ツモとして20符を設定
  if (fu === 0) {
    adjustedFu = 20;
  }

  // 符数が25でない場合、10符単位に切り上げ
  if (adjustedFu !== 25) {
    adjustedFu = Math.ceil(adjustedFu / 10) * 10;
    // 最低30符（平和ツモ除く）
    if (adjustedFu < 30 && fu !== 0) {
      adjustedFu = 30;
    }
  }

  // 該当する符数の点数を取得
  const scoreInfo = hanScores[adjustedFu];
  if (!scoreInfo) {
    // 該当する符数がない場合、最も近い符数を探す
    const availableFus = Object.keys(hanScores)
      .map(Number)
      .sort((a, b) => a - b);

    const closestFu =
      availableFus.find((f) => f >= adjustedFu) ||
      availableFus[availableFus.length - 1];
    const closestScoreInfo = hanScores[closestFu];

    if (!closestScoreInfo) {
      return {
        oyaRon: "0",
        oyaTsumo: "0",
        coRon: "0",
        coTsumo: "0",
        han,
        fu,
        isValid: false,
      };
    }

    return {
      ...closestScoreInfo,
      han,
      fu: closestFu,
      isValid: true,
    };
  }

  // 3翻60符以上、4翻70符以上は満貫
  const limitName = checkLimitHand(han, adjustedFu);

  return {
    ...scoreInfo,
    han,
    fu: adjustedFu,
    isValid: true,
    limitName,
  };
};

/**
 * 満貫以上の名称を取得
 * @param han 翻数
 * @returns 満貫、跳満などの名称
 */
const getLimitName = (han: number): string => {
  if (han >= 13) return "数え役満";
  if (han >= 11) return "三倍満";
  if (han >= 8) return "倍満";
  if (han >= 6) return "跳満";
  if (han >= 5) return "満貫";
  return "";
};

/**
 * 通常の翻数でも満貫になるケースをチェック
 * @param han 翻数
 * @param fu 符数
 * @returns 満貫以上の名称（該当しない場合は空文字）
 */
const checkLimitHand = (han: number, fu: number): string | undefined => {
  // 3翻60符以上は満貫
  if (han === 3 && fu >= 60) return "満貫";
  // 4翻70符以上は満貫
  if (han === 4 && fu >= 70) return "満貫";

  return undefined;
};

/**
 * 点数情報を表示用の文字列に整形
 * @param scoreResult 点数計算結果
 * @returns 表示用の文字列
 */
export const formatScoreForDisplay = (scoreResult: AllScoreResult): string => {
  if (!scoreResult.isValid) {
    return "無効な組み合わせ";
  }

  const parts = [];

  // 翻数・符数の表示
  if (scoreResult.limitName) {
    parts.push(`${scoreResult.han}翻 ${scoreResult.limitName}`);
  } else {
    parts.push(`${scoreResult.han}翻${scoreResult.fu}符`);
  }

  // 点数の表示
  parts.push(`親: ロン${scoreResult.oyaRon} ツモ${scoreResult.oyaTsumo}`);
  parts.push(`子: ロン${scoreResult.coRon} ツモ${scoreResult.coTsumo}`);

  return parts.join("\n");
};

/**
 * 点数表に存在する有効な符数一覧を取得
 * @param han 翻数
 * @returns 有効な符数の配列
 */
export const getValidFuList = (han: number): number[] => {
  const hanScores = MAHJONG_SCORE_TABLE[han];
  if (!hanScores) return [];

  return Object.keys(hanScores)
    .map(Number)
    .sort((a, b) => a - b);
};
