import { MahjongButtonItem } from "@/src/hooks/calculation/useCalculator";

/**
 * 麻雀の役・符ボタンの設定
 * 各項目の説明：
 * - label: ボタンに表示される名前
 * - han: 翻数（1翻、2翻など）
 * - fu: 符数（2符、4符など）
 * - maxCount: 最大クリック回数（ドラは4枚まで、役は通常1回など）
 * - exclusiveGroup: 排他制御グループ（同じグループ内は1つのみ選択可能）
 * - initialHanBonus: 初回クリック時の翻ボーナス（七対子は2翻スタート）
 * - fuFixed: 符を固定するか（七対子は25符固定）
 */
export const MAHJONG_BUTTON_CONFIG: MahjongButtonItem[] = [
  // === 立直関連（排他制御） ===
  {
    label: "立直",
    han: 1,
    fu: 0,
    maxCount: 1,
    exclusiveGroup: "riichi",
  },
  {
    label: "ダブル立直",
    han: 2,
    fu: 0,
    maxCount: 1,
    exclusiveGroup: "riichi",
  },

  // === 偶然役 ===
  {
    label: "一発",
    han: 1,
    fu: 0,
    maxCount: 1,
  },
  {
    label: "門前清自摸和",
    han: 1,
    fu: 0,
    maxCount: 1,
  },

  // === 三元牌（排他制御：同時に複数選択不可） ===
  {
    label: "白",
    han: 1,
    fu: 0,
    maxCount: 3,
    exclusiveGroup: "sangenpai",
  },
  {
    label: "發",
    han: 1,
    fu: 0,
    maxCount: 3,
    exclusiveGroup: "sangenpai",
  },
  {
    label: "中",
    han: 1,
    fu: 0,
    maxCount: 3,
    exclusiveGroup: "sangenpai",
  },

  // === ドラ関連 ===
  {
    label: "ドラ",
    han: 1,
    fu: 0,
    maxCount: 4, // 最大4枚まで
  },
  {
    label: "赤ドラ",
    han: 1,
    fu: 0,
    maxCount: 3, // 赤5は3枚まで
  },

  // === 符に関する要素 ===
  {
    label: "明刻",
    han: 0,
    fu: 2,
    maxCount: 4, // 最大4つまで面子を作れる
  },
  {
    label: "暗刻",
    han: 0,
    fu: 4,
    maxCount: 4,
  },
  {
    label: "明槓",
    han: 0,
    fu: 8,
    maxCount: 4,
  },
  {
    label: "暗槓",
    han: 0,
    fu: 16,
    maxCount: 4,
  },

  // === 特殊役（排他制御：平和と七対子は同時成立不可） ===
  {
    label: "七対子",
    han: 1,
    fu: 25,
    maxCount: 4,
    initialHanBonus: 1, // 初回で2翻スタート
    fuFixed: true, // 符は25符固定
    exclusiveGroup: "special_hands",
  },
  {
    label: "平和",
    han: 1,
    fu: 0,
    maxCount: 1,
    exclusiveGroup: "special_hands",
  },
];
