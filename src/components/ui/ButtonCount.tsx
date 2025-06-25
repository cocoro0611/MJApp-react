"use client";

import { ReactNode, useState } from "react";

interface ButtonCountProps {
  children: ReactNode;
  count?: number;
  externalCount?: number;
  onClick?: (externalCount: number, isSelected: boolean) => void;
  // ボタンに飜数を表示したい時
  group?: string;
  totalHan?: number;
}

const ButtonCount = ({
  children,
  count = 1,
  externalCount,
  onClick,
  group,
  totalHan,
}: ButtonCountProps) => {
  const [internalCount, setInternalCount] = useState<number>(0);

  // 親コンポーネントのbuttonCountsと子コンポーネントのnternalCountを連携
  const currentCount =
    externalCount !== undefined ? externalCount : internalCount;

  const handleClick = () => {
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
        scale-effect rounded h-12 w-12 p-0.5 text-[0.7rem]
        ${currentCount === 0 ? "setting-off" : "setting-on"}
      `}
    >
      {children}
      {getDisplayContent()}
    </button>
  );
};

export default ButtonCount;
