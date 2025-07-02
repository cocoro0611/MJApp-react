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
  defaultPrimaryColor?: string;
  defaultSecondaryColor?: string;
}

const ColorSelector = ({
  defaultPrimaryColor = "blue",
  defaultSecondaryColor = "orange",
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
          <label className="flex text-primary-800 font-bold mb-3">
            プライマリカラー（メインカラー）
          </label>
          <div className="grid grid-cols-2 gap-3">
            {COLOR_OPTIONS.map((option) => (
              <Button
                key={`primary-${option.value}`}
                color={
                  selectedPrimary === option.value ? "toggle-on" : "toggle-off"
                }
                className="p-3 rounded text-sm flex items-center gap-2"
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
          <label className="flex text-secondary-800 font-bold mb-3">
            セカンダリカラー（アクセントカラー）
          </label>
          <div className="grid grid-cols-2 gap-3">
            {COLOR_OPTIONS.map((option) => (
              <Button
                key={`secondary-${option.value}`}
                color={
                  selectedSecondary === option.value
                    ? "toggle-on"
                    : "toggle-off"
                }
                className="p-3 rounded text-sm flex items-center gap-2"
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
          className="rounded p-2 w-full font-bold"
        >
          {isPending ? "保存中..." : "保存"}
        </ToastButton>
      </Form>
    </div>
  );
};

export default ColorSelector;
