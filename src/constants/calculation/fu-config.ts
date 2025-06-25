import { MahjongItem } from "@/src/hooks/calculation/useCalculator";

export const FU_CONFIG: MahjongItem[] = [
  // === 和了 + 飜数 ===
  {
    label: "門前ロン",
    han: 1,
    fu: 30,
    count: 4,
    group: "agari",
    fuFixed: true, //　符の固定
  },
  {
    label: "ツモ",
    han: 1,
    fu: 22,
    count: 4,
    group: "agari",
    fuFixed: true, //　符の固定
  },
  {
    label: "七対子",
    han: 1,
    fu: 25,
    count: 3,
    group: "agari",
    initialHan: 1, // 2翻から
    fuFixed: true, //　符の固定
  },
  {
    label: "平和ツモ",
    han: 1,
    fu: 20,
    count: 3,
    group: "agari",
    initialHan: 1, // 2翻から
    fuFixed: true, //　符の固定
  },
  // === 面子（2-8） ===
  { label: "明刻", han: 0, fu: 2, count: 4 },
  { label: "暗刻", han: 0, fu: 4, count: 4 },
  { label: "明槓", han: 0, fu: 8, count: 4 },
  { label: "暗槓", han: 0, fu: 16, count: 4 },
  // === 面子（1,9,字牌） ===
  { label: "明刻", han: 0, fu: 4, count: 4 },
  { label: "暗刻", han: 0, fu: 8, count: 4 },
  { label: "明槓", han: 0, fu: 16, count: 4 },
  { label: "暗槓", han: 0, fu: 32, count: 4 },
  // === 雀頭 ===
  { label: "役牌", han: 0, fu: 2, count: 1, group: "head" },
  { label: "連風牌", han: 0, fu: 4, count: 1, group: "head" },
  // === 待ち ===
  { label: "単騎", han: 0, fu: 2, count: 1, group: "wait" },
  { label: "辺張", han: 0, fu: 2, count: 1, group: "wait" },
  { label: "間張", han: 0, fu: 2, count: 1, group: "wait" },
  { label: "延べ単", han: 0, fu: 2, count: 1, group: "wait" },
];

// グループの設定
export const FU_GROUPS = [
  { han: 1, label: "和了 + 飜数" },
  { han: 0, label: "それ以外" },
];
