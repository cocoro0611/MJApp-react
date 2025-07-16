"use client";

import Form from "next/form";
import Button from "@/src/components/ui/Button";
import ToastButton from "@/src/components/nav/ToastButton";
import { useState } from "react";
import { useServerActionToast } from "@/src/hooks/ui/useServerActionToast";
import { useColorTheme } from "@/src/lib/providers/ColorThemeProvider";
import { upsertColor } from "@/src/lib/models/setting";
import { COLOR_OPTIONS } from "@/src/constants/colorTheme";
import type { Color } from "@/src/constants/colorTheme";

interface ColorSelectorProps {
  defaultPrimaryColor: string;
  defaultSecondaryColor: string;
}

const ColorSelector = ({
  defaultPrimaryColor,
  defaultSecondaryColor,
}: ColorSelectorProps) => {
  const { primaryColor, secondaryColor, setPrimaryColor, setSecondaryColor } =
    useColorTheme();

  const [selectedPrimary, setSelectedPrimary] = useState<Color>(
    (defaultPrimaryColor as Color) || primaryColor
  );
  const [selectedSecondary, setSelectedSecondary] = useState<Color>(
    (defaultSecondaryColor as Color) || secondaryColor
  );

  const { isPending, toastMessage, toastColor, redirect, handleSubmit } =
    useServerActionToast(upsertColor);

  const handlePrimaryChange = (color: Color) => {
    setSelectedPrimary(color);
    setPrimaryColor(color); // プレビュー用に即座に変更
  };

  const handleSecondaryChange = (color: Color) => {
    setSelectedSecondary(color);
    setSecondaryColor(color); // プレビュー用に即座に変更
  };

  return (
    <div className="w-full space-y-6">
      <Form action={handleSubmit} className="space-y-6">
        <input type="hidden" name="primaryColor" value={selectedPrimary} />
        <input type="hidden" name="secondaryColor" value={selectedSecondary} />

        {/* プライマリカラー選択 */}
        <div>
          <label className="flex text-primary-800 font-bold mb-2">
            プライマリカラー（メインカラー）
          </label>
          <div className="grid-4 gap-2">
            {COLOR_OPTIONS.map((option) => (
              <Button
                type="submit"
                key={`primary-${option.value}`}
                color={
                  selectedPrimary === option.value ? "toggle-on" : "toggle-off"
                }
                className="py-2 rounded text-[0.6rem] font-bold center flex-col gap-1"
                onClick={() => handlePrimaryChange(option.value as Color)}
              >
                <div
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: option.preview }}
                />
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* セカンダリカラー選択 */}
        <div>
          <label className="flex text-secondary-800 font-bold mb-2">
            セカンダリカラー（アクセントカラー）
          </label>
          <div className="grid-4 gap-2">
            {COLOR_OPTIONS.map((option) => (
              <Button
                type="submit"
                key={`secondary-${option.value}`}
                color={
                  selectedSecondary === option.value
                    ? "toggle-on"
                    : "toggle-off"
                }
                className="py-2 rounded text-[0.6rem] font-bold center flex-col gap-1"
                onClick={() => handleSecondaryChange(option.value as Color)}
              >
                <div
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: option.preview }}
                />
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <ToastButton
          toastMessage={toastMessage}
          toastColor={toastColor}
          redirect={redirect}
          shouldReload={true} // カラー変更時はリロードする
          className="hidden"
        >
          {isPending ? "保存中..." : "保存"}
        </ToastButton>
      </Form>
    </div>
  );
};

export default ColorSelector;
