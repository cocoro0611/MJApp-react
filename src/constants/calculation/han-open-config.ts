import { MahjongItem } from "@/src/hooks/calculation/useCalculator";

export const HAN_OPEN_CONFIG: MahjongItem[] = [
  // === １飜役 ===
  { label: "白", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "發", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "中", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "自風牌", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "場風牌", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "断幺九", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "海底摸月", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "河底撈魚", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "嶺上開花", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "槍槓", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "三色同順", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "一気通貫", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "混全帯么九", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "ドラ", han: 1, fu: 0, count: 13, category: "1-han" },

  // === ２飜役 ===
  { label: "三色同刻", han: 2, fu: 0, count: 1, category: "2-han" },
  { label: "三暗刻", han: 2, fu: 0, count: 1, category: "2-han" },
  { label: "対々和", han: 2, fu: 0, count: 1, category: "2-han" },
  { label: "三槓子", han: 2, fu: 0, count: 1, category: "2-han" },
  { label: "小三元", han: 2, fu: 0, count: 1, category: "2-han" },
  { label: "混老頭", han: 2, fu: 0, count: 1, category: "2-han" },
  { label: "純全帯么九", han: 2, fu: 0, count: 1, category: "2-han" },
  { label: "混一色", han: 2, fu: 0, count: 1, category: "2-han" },

  // === ５飜役 ===
  { label: "清一色", han: 5, fu: 0, count: 1, category: "5-han" },

  // === 役満 ===
  { label: "大三元", han: 13, fu: 0, count: 1, category: "13-han" },
  { label: "緑一色", han: 13, fu: 0, count: 1, category: "13-han" },
  { label: "字一色", han: 13, fu: 0, count: 1, category: "13-han" },
  { label: "清老頭", han: 13, fu: 0, count: 1, category: "13-han" },
  { label: "四槓子", han: 13, fu: 0, count: 1, category: "13-han" },
  { label: "小四喜", han: 13, fu: 0, count: 1, category: "13-han" },

  // === ダブル役満 ===
  { label: "大四喜", han: 26, fu: 0, count: 1, category: "26-han" },
];

// 翻数別グループの設定
export const HAN_OPEN_GROUPS = [
  { category: "1-han", label: "１翻役" },
  { category: "2-han", label: "２翻役" },
  { category: "5-han", label: "６翻役" },
  { category: "13-han", label: "役満" },
  { category: "26-han", label: "ダブル役満" },
];
