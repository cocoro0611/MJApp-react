"use client";

import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import ButtonCount from "@/src/components/ui/ButtonCount";
import { useCalculator } from "@/src/hooks/calculation/useCalculator";
import { MAHJONG_BUTTON_CONFIG } from "@/src/constants/calculation/mahjongButtonConfig";

/**
 * 麻雀点数計算ページ
 * 役・符をクリックして翻数と符数を計算する
 */
const CalculationPage = () => {
  // 麻雀計算機のカスタムフック
  const {
    buttonCounts, // 各ボタンのクリック回数
    totalHan, // 翻の合計
    totalFu, // 符の合計
    selectedItems, // 選択された項目の詳細
    handleButtonClick, // ボタンクリック処理
    resetAllButtons, // 全リセット処理
  } = useCalculator(MAHJONG_BUTTON_CONFIG);

  return (
    <>
      <Header title="　" href="/calculation" />
      <Main>
        {/* 役・符選択ボタングリッド */}
        <div className="grid-6">
          {MAHJONG_BUTTON_CONFIG.map((buttonConfig, index) => (
            <ButtonCount
              key={index}
              className="text-xs"
              maxCount={buttonConfig.maxCount}
              count={buttonCounts[index]} // 外部からcount値を制御
              onClick={(count) => handleButtonClick(index, count)}
            >
              {buttonConfig.label}
            </ButtonCount>
          ))}
        </div>

        {/* 全リセットボタン */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={resetAllButtons}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
          >
            全てリセット
          </button>
        </div>

        {/* 計算結果表示エリア */}
        <div className="mt-6 text-center">
          {/* 翻・符の合計表示 */}
          <div className="flex justify-center gap-8 mb-4">
            <div className="text-xl font-bold">
              翻: <span className="text-blue-600">{totalHan}</span>
            </div>
            <div className="text-xl font-bold">
              符: <span className="text-green-600">{totalFu}</span>
            </div>
          </div>

          {/* 選択された項目の詳細表示 */}
          {selectedItems.length > 0 && (
            <div className="text-sm text-gray-600 space-y-2">
              <div className="font-semibold">選択された項目:</div>
              <div className="grid grid-cols-1 gap-1 max-w-md mx-auto">
                {selectedItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center px-2 py-1 bg-gray-50 rounded"
                  >
                    {/* 項目名とクリック回数 */}
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.label}</span>
                      {item.count > 1 && (
                        <span className="text-xs text-gray-500">
                          ×{item.count}
                        </span>
                      )}
                    </div>

                    {/* 翻数・符数表示 */}
                    <div className="flex gap-3 text-xs">
                      {item.han > 0 && (
                        <span className="text-blue-600">{item.han}翻</span>
                      )}
                      {item.fu > 0 && (
                        <span className="text-green-600">{item.fu}符</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Main>
    </>
  );
};

export default CalculationPage;
