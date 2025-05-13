export const INITIAL_POINT_OPTIONS = [
  { value: 25000, label: "25000点" },
  { value: 30000, label: "30000点" },
  { value: 35000, label: "35000点" },
  { value: 40000, label: "40000点" },
];

export const RETURN_POINT_OPTIONS = [
  { value: 30000, label: "30000点" },
  { value: 35000, label: "35000点" },
  { value: 40000, label: "40000点" },
  { value: 45000, label: "45000点" },
];

export const BONUS_POINT_OPTIONS = [
  { value: "00-00", label: "なし" },
  { value: "05-10", label: "5 - 10" },
  { value: "10-20", label: "10 - 20" },
  { value: "10-30", label: "10 - 30" },
];

export const SCORE_RATE_OPTIONS = [
  { value: 0, label: "なし" },
  { value: 10, label: "テンイチ" },
  { value: 30, label: "テンサン" },
  { value: 50, label: "テンゴ" },
  { value: 60, label: "テンロク" },
  { value: 70, label: "テンナナ" },
  { value: 80, label: "テンハチ" },
  { value: 100, label: "テンピン" },
];

export const CHIP_RATE_OPTIONS = [
  { value: 0, label: "なし" },
  { value: 100, label: "100P" },
  { value: 200, label: "200P" },
  { value: 300, label: "300P" },
  { value: 400, label: "400P" },
  { value: 500, label: "500P" },
];

export const DEFAULT_GAME_RULES = {
  initialPoint: 25000,
  returnPoint: 30000,
  bonusPoint: "10-30",
  scoreRate: 50,
  chipRate: 200,
};
