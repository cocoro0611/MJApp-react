"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  COLOR_PALETTES,
  DEFAULT_PRIMARY_COLOR,
  DEFAULT_SECONDARY_COLOR,
  getValidColor,
} from "@/src/constants/colorTheme";
import type { Color } from "@/src/constants/colorTheme";

interface ColorThemeContextType {
  primaryColor: Color;
  secondaryColor: Color;
  setPrimaryColor: (color: Color) => void;
  setSecondaryColor: (color: Color) => void;
}

const ColorThemeContext = createContext<ColorThemeContextType>({
  primaryColor: DEFAULT_PRIMARY_COLOR,
  secondaryColor: DEFAULT_SECONDARY_COLOR,
  setPrimaryColor: () => {},
  setSecondaryColor: () => {},
});

export const useColorTheme = () => useContext(ColorThemeContext);

interface ColorThemeProviderProps {
  children: ReactNode;
  initialPrimaryColor?: string;
  initialSecondaryColor?: string;
}

export const ColorThemeProvider = ({
  children,
  initialPrimaryColor,
  initialSecondaryColor,
}: ColorThemeProviderProps) => {
  // 型安全に初期値を設定
  const [primaryColor, setPrimaryColorState] = useState<Color>(
    getValidColor(initialPrimaryColor, DEFAULT_PRIMARY_COLOR)
  );
  const [secondaryColor, setSecondaryColorState] = useState<Color>(
    getValidColor(initialSecondaryColor, DEFAULT_SECONDARY_COLOR)
  );

  const setPrimaryColor = (color: Color) => {
    setPrimaryColorState(color);
    updateCSSVariables(color, secondaryColor);
  };

  const setSecondaryColor = (color: Color) => {
    setSecondaryColorState(color);
    updateCSSVariables(primaryColor, color);
  };

  const updateCSSVariables = (primary: Color, secondary: Color) => {
    const root = document.documentElement;

    // プライマリカラーを更新
    const primaryPalette = COLOR_PALETTES[primary];
    Object.entries(primaryPalette).forEach(([shade, color]) => {
      root.style.setProperty(`--color-primary-${shade}`, color);
    });

    // セカンダリカラーを更新
    const secondaryPalette = COLOR_PALETTES[secondary];
    Object.entries(secondaryPalette).forEach(([shade, color]) => {
      root.style.setProperty(`--color-secondary-${shade}`, color);
    });
  };

  // 初回レンダリング時にCSSを更新
  useEffect(() => {
    updateCSSVariables(primaryColor, secondaryColor);
  }, [primaryColor, secondaryColor]);

  return (
    <ColorThemeContext.Provider
      value={{
        primaryColor,
        secondaryColor,
        setPrimaryColor,
        setSecondaryColor,
      }}
    >
      {children}
    </ColorThemeContext.Provider>
  );
};
