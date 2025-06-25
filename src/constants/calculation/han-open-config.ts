import { MahjongItem } from "@/src/hooks/calculation/useCalculator";

export const HAN_OPEN_CONFIG: MahjongItem[] = [
  // === １飜役 ===
  { label: "白", han: 1, fu: 0, count: 1 },
  { label: "發", han: 1, fu: 0, count: 1 },
  { label: "中", han: 1, fu: 0, count: 1 },
  { label: "自風牌", han: 1, fu: 0, count: 1 },
  { label: "場風牌", han: 1, fu: 0, count: 1 },
  { label: "断幺九", han: 1, fu: 0, count: 1 },
  { label: "海底摸月", han: 1, fu: 0, count: 1 },
  { label: "河底撈魚", han: 1, fu: 0, count: 1 },
  { label: "嶺上開花", han: 1, fu: 0, count: 1 },
  { label: "槍槓", han: 1, fu: 0, count: 1 },
  { label: "三色同順", han: 1, fu: 0, count: 1 },
  { label: "一気通貫", han: 1, fu: 0, count: 1 },
  { label: "混全帯么九", han: 1, fu: 0, count: 1 },
  { label: "ドラ", han: 1, fu: 0, count: 13 },

  // === ２飜役 ===
  { label: "三色同刻", han: 2, fu: 0, count: 1 },
  { label: "三暗刻", han: 2, fu: 0, count: 1 },
  { label: "対々和", han: 2, fu: 0, count: 1 },
  { label: "三槓子", han: 2, fu: 0, count: 1 },
  { label: "小三元", han: 2, fu: 0, count: 1 },
  { label: "混老頭", han: 2, fu: 0, count: 1 },
  { label: "純全帯么九", han: 2, fu: 0, count: 1 },
  { label: "混一色", han: 2, fu: 0, count: 1 },

  // === ５飜役 ===
  { label: "清一色", han: 5, fu: 0, count: 1 },

  // === 役満 ===
  { label: "大三元", han: 13, fu: 0, count: 1 },
  { label: "緑一色", han: 13, fu: 0, count: 1 },
  { label: "字一色", han: 13, fu: 0, count: 1 },
  { label: "清老頭", han: 13, fu: 0, count: 1 },
  { label: "四槓子", han: 13, fu: 0, count: 1 },
  { label: "小四喜", han: 13, fu: 0, count: 1 },

  // === ダブル役満 ===
  { label: "大四喜", han: 26, fu: 0, count: 1 },
];

// 翻数別グループの設定
export const HAN_OPEN_GROUPS = [
  { han: 1, label: "１翻役" },
  { han: 2, label: "２翻役" },
  { han: 5, label: "５翻役" },
  { han: 13, label: "役満" },
  { han: 26, label: "ダブル役満" },
];
