import { MahjongItem } from "@/src/hooks/calculation/useCalculator";

export const HAN_CONCEALED_CONFIG: MahjongItem[] = [
  // === １飜役 ===
  { label: "立直", han: 1, fu: 0, count: 1 },
  { label: "一発", han: 1, fu: 0, count: 1 },
  { label: "門前清自摸和", han: 1, fu: 0, count: 1 },
  { label: "白", han: 1, fu: 0, count: 1 },
  { label: "發", han: 1, fu: 0, count: 1 },
  { label: "中", han: 1, fu: 0, count: 1 },
  { label: "自風牌", han: 1, fu: 0, count: 1 },
  { label: "場風牌", han: 1, fu: 0, count: 1 },
  { label: "断幺九", han: 1, fu: 0, count: 1 },
  { label: "平和", han: 1, fu: 0, count: 1 },
  { label: "一盃口", han: 1, fu: 0, count: 1 },
  { label: "海底摸月", han: 1, fu: 0, count: 1 },
  { label: "河底撈魚", han: 1, fu: 0, count: 1 },
  { label: "嶺上開花", han: 1, fu: 0, count: 1 },
  { label: "槍槓", han: 1, fu: 0, count: 1 },
  { label: "ドラ", han: 1, fu: 0, count: 13 },

  // === ２飜役 ===
  { label: "ダブル立直", han: 2, fu: 0, count: 1 },
  { label: "三色同順", han: 2, fu: 0, count: 1 },
  { label: "三色同刻", han: 2, fu: 0, count: 1 },
  { label: "三暗刻", han: 2, fu: 0, count: 1 },
  { label: "一気通貫", han: 2, fu: 0, count: 1 },
  { label: "七対子", han: 2, fu: 0, count: 1 },
  { label: "対々和", han: 2, fu: 0, count: 1 },
  { label: "混全帯么九", han: 2, fu: 0, count: 1 },
  { label: "三槓子", han: 2, fu: 0, count: 1 },
  { label: "小三元", han: 2, fu: 0, count: 1 },
  { label: "混老頭", han: 2, fu: 0, count: 1 },

  // === ３飜役 ===
  { label: "二盃口", han: 3, fu: 0, count: 1 },
  { label: "純全帯么九", han: 3, fu: 0, count: 1 },
  { label: "混一色", han: 3, fu: 0, count: 1 },

  // === ６飜役 ===
  { label: "清一色", han: 6, fu: 0, count: 1 },

  // === 役満 ===
  { label: "天和", han: 13, fu: 0, count: 1 },
  { label: "地和", han: 13, fu: 0, count: 1 },
  { label: "人和", han: 13, fu: 0, count: 1 },
  { label: "四暗刻", han: 13, fu: 0, count: 1 },
  { label: "国士無双", han: 13, fu: 0, count: 1 },
  { label: "九蓮宝燈", han: 13, fu: 0, count: 1 },
  { label: "大三元", han: 13, fu: 0, count: 1 },
  { label: "緑一色", han: 13, fu: 0, count: 1 },
  { label: "字一色", han: 13, fu: 0, count: 1 },
  { label: "清老頭", han: 13, fu: 0, count: 1 },
  { label: "四槓子", han: 13, fu: 0, count: 1 },
  { label: "小四喜", han: 13, fu: 0, count: 1 },

  // === ダブル役満 ===
  { label: "四暗刻単騎", han: 26, fu: 0, count: 1 },
  { label: "大四喜", han: 26, fu: 0, count: 1 },
  { label: "純正九蓮宝燈", han: 26, fu: 0, count: 1 },
  { label: "国士無双十三面待ち", han: 26, fu: 0, count: 1 },
];

// 翻数別グループの設定
export const HAN_CONCEALED_GROUPS = [
  { han: 1, label: "１翻役" },
  { han: 2, label: "２翻役" },
  { han: 3, label: "３翻役" },
  { han: 6, label: "６翻役" },
  { han: 13, label: "役満" },
  { han: 26, label: "ダブル役満" },
];
