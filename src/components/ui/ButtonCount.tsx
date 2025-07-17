"use client";

import { ReactNode, useState } from "react";
import { useClickSound } from "@/src/hooks/sounds/useClickSound";

interface ButtonCountProps {
  children: ReactNode;
  size?: "md" | "lg";
  count?: number;
  externalCount?: number;
  onClick?: (externalCount: number, isSelected: boolean) => void;
  // ボタンに飜数を表示したい時
  group?: string;
  totalHan?: number;
}

const ButtonCount = ({
  children,
  size = "md",
  count = 1,
  externalCount,
  onClick,
  group,
  totalHan,
}: ButtonCountProps) => {
  const [internalCount, setInternalCount] = useState<number>(0);
  const { playClick } = useClickSound();

  // 親コンポーネントのbuttonCountsと子コンポーネントのnternalCountを連携
  const currentCount =
    externalCount !== undefined ? externalCount : internalCount;

  const handleClick = () => {
    playClick(); // クリック音再生
    const newCount = currentCount >= count ? 0 : currentCount + 1;
    onClick?.(newCount, newCount > 0);

    if (externalCount === undefined) {
      setInternalCount(newCount);
    }
  };

  // 追加の表示内容
  const getDisplayContent = () => {
    if (currentCount === 0) {
      return null;
    }

    // agariグループの場合は翻数表示
    if (group === "agari" && totalHan !== undefined) {
      return <div className="text-[0.6rem]">{totalHan}翻</div>;
    }

    // 通常は×回数表示（count=1の場合は表示しない）
    if (count !== 1) {
      return <div className="text-[0.6rem]">×{currentCount}</div>;
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        effect-scale p-0.5 rounded text-[0.8rem]
        ${currentCount === 0 ? "toggle-off" : "toggle-on"}
        ${size === "md" ? "h-13.5 w-13.5" : "h-13.5 w-20"}
      `}
    >
      {children}
      {getDisplayContent()}
    </button>
  );
};

export default ButtonCount;
