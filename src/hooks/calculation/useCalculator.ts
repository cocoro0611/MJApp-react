import { useState, useCallback } from "react";

// 麻雀の役・符のボタン設定の型定義
export interface MahjongButtonItem {
  label: string; // ボタンに表示されるラベル
  han: number; // 翻数
  fu: number; // 符数
  maxCount: number; // 最大クリック回数
  exclusiveGroup?: string; // 排他制御グループ名（同じグループ内は1つのみ選択可能）
  initialHanBonus?: number; // 初回クリック時の翻ボーナス
  fuFixed?: boolean; // 符を固定するか（クリック回数で増えない）
}

// 選択された項目の詳細情報
export interface SelectedItem {
  label: string;
  count: number;
  han: number;
  fu: number;
}

/**
 * 麻雀点数計算のカスタムフック
 * @param buttonList 麻雀の役・符のボタン設定配列
 * @returns 計算機能とボタン制御の関数群
 */
export const useCalculator = (buttonList: MahjongButtonItem[]) => {
  // 各ボタンのクリック回数を管理
  const [buttonCounts, setButtonCounts] = useState<number[]>(
    new Array(buttonList.length).fill(0)
  );

  /**
   * 各項目の翻数を計算
   * @param item ボタン設定項目
   * @param count クリック回数
   * @returns 計算された翻数
   */
  const calculateHan = useCallback(
    (item: MahjongButtonItem, count: number): number => {
      if (count === 0) return 0;

      // 基本翻数 = クリック回数 × 設定翻数
      const baseHan = count * item.han;

      // 初回クリックボーナス（七対子などの特殊役用）
      const initialBonus =
        item.initialHanBonus && count > 0 ? item.initialHanBonus : 0;

      return baseHan + initialBonus;
    },
    []
  );

  /**
   * 各項目の符数を計算
   * @param item ボタン設定項目
   * @param count クリック回数
   * @returns 計算された符数
   */
  const calculateFu = useCallback(
    (item: MahjongButtonItem, count: number): number => {
      if (count === 0) return 0;

      if (item.fuFixed) {
        // 符が固定の場合、1回でもクリックされていれば設定値をそのまま返す
        // （七対子の25符など、クリック回数に関係なく固定）
        return item.fu;
      } else {
        // 通常の場合、クリック回数分を掛ける
        // （明刻×2 = 4符など）
        return count * item.fu;
      }
    },
    []
  );

  /**
   * ボタンクリック時の処理
   * @param index クリックされたボタンのインデックス
   * @param count 新しいクリック回数
   */
  const handleButtonClick = useCallback(
    (index: number, count: number) => {
      setButtonCounts((prevCounts) => {
        const newButtonCounts = [...prevCounts];
        const clickedItem = buttonList[index];

        // 排他制御: 同じグループの他のボタンを0にリセット
        // 例：「白」を選択したら「發」「中」は自動的に0になる
        if (clickedItem.exclusiveGroup && count > 0) {
          buttonList.forEach((item, i) => {
            if (
              i !== index &&
              item.exclusiveGroup === clickedItem.exclusiveGroup
            ) {
              newButtonCounts[i] = 0;
            }
          });
        }

        // クリックされたボタンのカウントを更新
        newButtonCounts[index] = count;
        return newButtonCounts;
      });
    },
    [buttonList]
  );

  /**
   * 全てのボタンをリセット
   */
  const resetAllButtons = useCallback(() => {
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

  // 選択された項目の詳細情報を生成
  const selectedItems: SelectedItem[] = buttonCounts
    .map((count, index) => {
      if (count > 0) {
        const item = buttonList[index];
        return {
          label: item.label,
          count: count,
          han: calculateHan(item, count),
          fu: calculateFu(item, count),
        };
      }
      return null;
    })
    .filter((item): item is SelectedItem => item !== null);

  return {
    // 状態
    buttonCounts,
    totalHan,
    totalFu,
    selectedItems,

    // 関数
    handleButtonClick,
    resetAllButtons,
  };
};
