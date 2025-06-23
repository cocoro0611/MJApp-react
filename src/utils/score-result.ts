// ウマとオカを計算する関数
export const calculateBonusPoints = (
  initialPoint: number,
  returnPoint: number,
  bonusPoint: string
): number[] => {
  // "10-30" や "05-10" のような形式から数値を抽出
  const parts = bonusPoint.split("-");

  const first = Number(parts[0]); // "05" → 5, "10" → 10
  const second = Number(parts[1]); // "10" → 10, "30" → 30

  const oka = ((returnPoint - initialPoint) / 1000) * 4;

  return [second + oka, first, -first, -second];
};
