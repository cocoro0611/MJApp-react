import { useState, useCallback } from "react";

export interface MahjongItem {
  label: string;
  han: number;
  fu: number;
  count: number;
  category: string;
  group?: string; // 排他制御グループ名（同じグループ内は1つのみ選択可能）
  initialHan?: number; // 初回クリック時の翻ボーナス
  fuFixed?: boolean; // 符を固定するか（クリック回数で増えない）
}

export interface SelectedItem {
  label: string;
  count: number;
  han: number;
  fu: number;
}

export const useCalculator = (buttonList: MahjongItem[]) => {
  const [buttonCounts, setButtonCounts] = useState<number[]>(
    new Array(buttonList.length).fill(0)
  );

  // 各項目の翻数を計算
  const calculateHan = useCallback(
    (item: MahjongItem, count: number): number => {
      if (count === 0) return 0;

      const baseHan = count * item.han;
      const initialBonus = item.initialHan ? item.initialHan : 0; // 七対子、平和ツモ

      return baseHan + initialBonus;
    },
    []
  );

  // 各項目の符数を計算
  const calculateFu = useCallback(
    (item: MahjongItem, count: number): number => {
      if (count === 0) return 0;

      if (item.fuFixed) {
        return item.fu; // 符の固定
      } else {
        return count * item.fu;
      }
    },
    []
  );

  // 排他制御
  const exclusiveButton = useCallback(
    (index: number, count: number) => {
      setButtonCounts((prevCounts) => {
        const newButtonCounts = [...prevCounts];
        const clickedItem = buttonList[index];

        if (clickedItem.group) {
          buttonList.forEach((item, i) => {
            if (i !== index && item.group === clickedItem.group) {
              newButtonCounts[i] = 0;
            }
          });
        }

        newButtonCounts[index] = count;
        return newButtonCounts;
      });
    },
    [buttonList]
  );

  // ボタンをリセット
  const resetButton = useCallback(() => {
    setButtonCounts(new Array(buttonList.length).fill(0));
  }, [buttonList.length]);

  // 翻の合計を計算
  const totalHan = buttonCounts.reduce((sum, count, index) => {
    return sum + calculateHan(buttonList[index], count);
  }, 0);

  // 符の合計を計算
  const totalFu = buttonCounts.reduce((sum, count, index) => {
    return sum + calculateFu(buttonList[index], count);
  }, 0);

  return {
    buttonCounts,
    totalHan,
    totalFu,
    exclusiveButton,
    resetButton,
  };
};
