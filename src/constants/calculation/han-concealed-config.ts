import { MahjongItem } from "@/src/hooks/calculation/useCalculator";

export const HAN_CONCEALED_CONFIG: MahjongItem[] = [
  // === １飜役 ===
  { label: "立直", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "一発", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "門前清自摸和", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "白", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "發", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "中", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "自風牌", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "場風牌", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "断幺九", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "平和", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "一盃口", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "海底摸月", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "河底撈魚", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "嶺上開花", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "槍槓", han: 1, fu: 0, count: 1, category: "1-han" },
  { label: "ドラ", han: 1, fu: 0, count: 13, category: "1-han" },

  // === ２飜役 ===
  { label: "ダブル立直", han: 2, fu: 0, count: 1, category: "2-han" },
  { label: "三色同順", han: 2, fu: 0, count: 1, category: "2-han" },
  { label: "三色同刻", han: 2, fu: 0, count: 1, category: "2-han" },
  { label: "三暗刻", han: 2, fu: 0, count: 1, category: "2-han" },
  { label: "一気通貫", han: 2, fu: 0, count: 1, category: "2-han" },
  { label: "七対子", han: 2, fu: 0, count: 1, category: "2-han" },
  { label: "対々和", han: 2, fu: 0, count: 1, category: "2-han" },
  { label: "混全帯么九", han: 2, fu: 0, count: 1, category: "2-han" },
  { label: "三槓子", han: 2, fu: 0, count: 1, category: "2-han" },
  { label: "小三元", han: 2, fu: 0, count: 1, category: "2-han" },
  { label: "混老頭", han: 2, fu: 0, count: 1, category: "2-han" },

  // === ３飜役 ===
  { label: "二盃口", han: 3, fu: 0, count: 1, category: "3-han" },
  { label: "純全帯么九", han: 3, fu: 0, count: 1, category: "3-han" },
  { label: "混一色", han: 3, fu: 0, count: 1, category: "3-han" },

  // === ６飜役 ===
  { label: "清一色", han: 6, fu: 0, count: 1, category: "6-han" },

  // === 役満 ===
  { label: "天和", han: 13, fu: 0, count: 1, category: "13-han" },
  { label: "地和", han: 13, fu: 0, count: 1, category: "13-han" },
  { label: "人和", han: 13, fu: 0, count: 1, category: "13-han" },
  { label: "四暗刻", han: 13, fu: 0, count: 1, category: "13-han" },
  { label: "国士無双", han: 13, fu: 0, count: 1, category: "13-han" },
  { label: "九蓮宝燈", han: 13, fu: 0, count: 1, category: "13-han" },
  { label: "大三元", han: 13, fu: 0, count: 1, category: "13-han" },
  { label: "緑一色", han: 13, fu: 0, count: 1, category: "13-han" },
  { label: "字一色", han: 13, fu: 0, count: 1, category: "13-han" },
  { label: "清老頭", han: 13, fu: 0, count: 1, category: "13-han" },
  { label: "四槓子", han: 13, fu: 0, count: 1, category: "13-han" },
  { label: "小四喜", han: 13, fu: 0, count: 1, category: "13-han" },

  // === ダブル役満 ===
  { label: "四暗刻単騎", han: 26, fu: 0, count: 1, category: "26-han" },
  { label: "大四喜", han: 26, fu: 0, count: 1, category: "26-han" },
  { label: "純正九蓮宝燈", han: 26, fu: 0, count: 1, category: "26-han" },
  { label: "国士無双十三面待ち", han: 26, fu: 0, count: 1, category: "26-han" },
];

// 翻数別グループの設定
export const HAN_CONCEALED_GROUPS = [
  { category: "1-han", label: "１翻役" },
  { category: "2-han", label: "２翻役" },
  { category: "3-han", label: "３翻役" },
  { category: "6-han", label: "６翻役" },
  { category: "13-han", label: "役満" },
  { category: "26-han", label: "ダブル役満" },
];
