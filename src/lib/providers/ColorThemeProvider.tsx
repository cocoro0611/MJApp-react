"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { COLOR_THEMES, DEFAULT_COLOR_THEME } from "@/src/constants/colorTheme";
import type { ColorTheme } from "@/src/constants/colorTheme";

interface ColorThemeContextType {
  // 従来の統一テーマ
  currentTheme: ColorTheme;
  setTheme: (theme: ColorTheme) => void;

  // 個別色選択
  primaryColor: ColorTheme;
  secondaryColor: ColorTheme;
  setPrimaryColor: (color: ColorTheme) => void;
  setSecondaryColor: (color: ColorTheme) => void;

  // カスタムモードかどうか
  isCustomMode: boolean;
  setCustomMode: (enabled: boolean) => void;
}

const ColorThemeContext = createContext<ColorThemeContextType>({
  currentTheme: DEFAULT_COLOR_THEME,
  setTheme: () => {},
  primaryColor: DEFAULT_COLOR_THEME,
  secondaryColor: DEFAULT_COLOR_THEME,
  setPrimaryColor: () => {},
  setSecondaryColor: () => {},
  isCustomMode: false,
  setCustomMode: () => {},
});

export const useColorTheme = () => useContext(ColorThemeContext);

interface ColorThemeProviderProps {
  children: ReactNode;
  initialTheme?: ColorTheme;
  initialPrimaryColor?: ColorTheme;
  initialSecondaryColor?: ColorTheme;
  initialCustomMode?: boolean;
}

export  const ColorThemeProvider = ({
  children,
  initialTheme = DEFAULT_COLOR_THEME,
  initialPrimaryColor = DEFAULT_COLOR_THEME,
  initialSecondaryColor = DEFAULT_COLOR_THEME,
  initialCustomMode = false,
}: ColorThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(initialTheme);
  const [primaryColor, setPrimaryColorState] =
    useState<ColorTheme>(initialPrimaryColor);
  const [secondaryColor, setSecondaryColorState] = useState<ColorTheme>(
    initialSecondaryColor
  );
  const [isCustomMode, setIsCustomMode] = useState(initialCustomMode);

  const setTheme = (theme: ColorTheme) => {
    setCurrentTheme(theme);
    setIsCustomMode(false);
    updateCSSVariables(theme, theme, false);
  };

  const setPrimaryColor = (color: ColorTheme) => {
    setPrimaryColorState(color);
    setIsCustomMode(true);
    updateCSSVariables(color, secondaryColor, true);
  };

  const setSecondaryColor = (color: ColorTheme) => {
    setSecondaryColorState(color);
    setIsCustomMode(true);
    updateCSSVariables(primaryColor, color, true);
  };

  const setCustomMode = (enabled: boolean) => {
    setIsCustomMode(enabled);
    if (enabled) {
      updateCSSVariables(primaryColor, secondaryColor, true);
    } else {
      updateCSSVariables(currentTheme, currentTheme, false);
    }
  };

  const updateCSSVariables = (
    primaryTheme: ColorTheme,
    secondaryTheme: ColorTheme,
    customMode: boolean
  ) => {
    const root = document.documentElement;

    if (customMode) {
      // カスタムモード：個別に選択された色を使用
      const primaryColors = COLOR_THEMES[primaryTheme].primary;
      const secondaryColors = COLOR_THEMES[secondaryTheme].primary; // secondary色も使いたい場合は.secondaryに変更

      // プライマリカラーを更新
      Object.entries(primaryColors).forEach(([shade, color]) => {
        root.style.setProperty(`--color-primary-${shade}`, color);
      });

      // セカンダリカラーを更新（選択された色のprimaryパレットを使用）
      Object.entries(secondaryColors).forEach(([shade, color]) => {
        root.style.setProperty(`--color-secondary-${shade}`, color);
      });
    } else {
      // 統一テーマモード：定義済みの組み合わせを使用
      const themeColors = COLOR_THEMES[primaryTheme];

      // プライマリカラーを更新
      Object.entries(themeColors.primary).forEach(([shade, color]) => {
        root.style.setProperty(`--color-primary-${shade}`, color);
      });

      // セカンダリカラーを更新
      Object.entries(themeColors.secondary).forEach(([shade, color]) => {
        root.style.setProperty(`--color-secondary-${shade}`, color);
      });
    }
  };

  useEffect(() => {
    if (isCustomMode) {
      updateCSSVariables(primaryColor, secondaryColor, true);
    } else {
      updateCSSVariables(currentTheme, currentTheme, false);
    }
  }, [currentTheme, primaryColor, secondaryColor, isCustomMode]);

  return (
    <ColorThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        primaryColor,
        secondaryColor,
        setPrimaryColor,
        setSecondaryColor,
        isCustomMode,
        setCustomMode,
      }}
    >
      {children}
    </ColorThemeContext.Provider>
  );
};
