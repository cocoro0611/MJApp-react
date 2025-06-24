"use client";

import { ReactNode, useState, useEffect } from "react";

interface ButtonCountProps {
  children: ReactNode;
  initialSelected?: boolean;
  disabled?: boolean;
  className?: string;
  maxCount?: number; //（1なら通常のtrue/false、2以上なら複数回クリック）
  count?: number; // 外部から制御するためのcount値
  onClick?: (count: number, isSelected: boolean) => void; // countとisSelectedの両方を返す
}

const ButtonCount = ({
  children,
  initialSelected = false,
  disabled = false,
  className = "",
  maxCount = 1, // デフォルトは1（通常のtrue/falseモード）
  count, // 外部から制御するcount
  onClick,
}: ButtonCountProps) => {
  const [internalCount, setInternalCount] = useState<number>(
    initialSelected ? 1 : 0
  );

  // 外部からcountが渡された場合、内部状態を同期
  useEffect(() => {
    if (count !== undefined) {
      setInternalCount(count);
    }
  }, [count]);

  const currentCount = count !== undefined ? count : internalCount;

  const handleClick = () => {
    if (!disabled) {
      const newCount = currentCount >= maxCount ? 0 : currentCount + 1;

      // 外部制御されていない場合のみ内部状態を更新
      if (count === undefined) {
        setInternalCount(newCount);
      }

      onClick?.(newCount, newCount > 0);
    }
  };

  // カウントに応じてボタンの表示を変更
  const getButtonClass = () => {
    if (currentCount === 0) {
      return "setting-off";
    } else {
      return "setting-on";
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`scale-effect rounded h-14 w-14 relative
      ${getButtonClass()}
      ${className}
      ${disabled ? "disabled-effect" : ""}  
      `}
    >
      {children}
      {maxCount !== 1 && currentCount > 0 ? (
        <div className="text-xs font-bold">×{currentCount}</div>
      ) : (
        ""
      )}
    </button>
  );
};

export default ButtonCount;
