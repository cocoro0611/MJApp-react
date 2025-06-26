import { MahjongItem } from "@/src/hooks/calculation/useCalculator";

export const FU_CONFIG: MahjongItem[] = [
  // === 和了 + 飜数 ===
  {
    label: "門前ロン",
    han: 1,
    fu: 30,
    count: 4,
    category: "1-han",
    group: "agari",
    fuFixed: true, //　符の固定
  },
  {
    label: "ツモ",
    han: 1,
    fu: 22,
    count: 4,
    category: "1-han",
    group: "agari",
    fuFixed: true, //　符の固定
  },
  {
    label: "七対子",
    han: 1,
    fu: 25,
    count: 3,
    category: "1-han",
    group: "agari",
    initialHan: 1, // 2翻から
    fuFixed: true, //　符の固定
  },
  {
    label: "平和ツモ",
    han: 1,
    fu: 20,
    count: 3,
    category: "1-han",
    group: "agari",
    initialHan: 1, // 2翻から
    fuFixed: true, //　符の固定
  },
  // === 面子（2-8） ===
  { label: "明刻", han: 0, fu: 2, count: 4, category: "2-8-fu" },
  { label: "暗刻", han: 0, fu: 4, count: 4, category: "2-8-fu" },
  { label: "明槓", han: 0, fu: 8, count: 4, category: "2-8-fu" },
  { label: "暗槓", han: 0, fu: 16, count: 4, category: "2-8-fu" },
  // === 面子（1,9,字牌） ===
  { label: "明刻", han: 0, fu: 4, count: 4, category: "1-9-fu" },
  { label: "暗刻", han: 0, fu: 8, count: 4, category: "1-9-fu" },
  { label: "明槓", han: 0, fu: 16, count: 4, category: "1-9-fu" },
  { label: "暗槓", han: 0, fu: 32, count: 4, category: "1-9-fu" },
  // === 雀頭 ===
  { label: "役牌", han: 0, fu: 2, count: 1, category: "head", group: "head" },
  { label: "連風牌", han: 0, fu: 4, count: 1, category: "head", group: "head" },
  // === 待ち ===
  { label: "単騎", han: 0, fu: 2, count: 1, category: "wait", group: "wait" },
  { label: "辺張", han: 0, fu: 2, count: 1, category: "wait", group: "wait" },
  { label: "間張", han: 0, fu: 2, count: 1, category: "wait", group: "wait" },
  { label: "延べ単", han: 0, fu: 2, count: 1, category: "wait", group: "wait" },
];

// グループの設定
export const FU_GROUPS = [
  { category: "1-han", label: "和了 + 飜数" },
  { category: "2-8-fu", label: "面子（2-8）" },
  { category: "1-9-fu", label: "面子（1,9,字牌）" },
  { category: "head", label: "雀頭" },
  { category: "wait", label: "待ち" },
];
