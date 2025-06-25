"use client";

import { ReactNode, useState, useEffect } from "react";

interface ButtonCountProps {
  children: ReactNode;
  initialSelected?: boolean;
  disabled?: boolean;
  className?: string;
  count?: number; //（1なら通常のtrue/false、2以上なら複数回クリック）
  effectCount?: number; // 外部から制御するためのcount値
  onClick?: (effectCount: number, isSelected: boolean) => void; // countとisSelectedの両方を返す
}

const ButtonCount = ({
  children,
  initialSelected = false,
  disabled = false,
  className = "",
  count = 1, // デフォルトは1（通常のtrue/falseモード）
  effectCount, // 外部から制御するcount
  onClick,
}: ButtonCountProps) => {
  const [internalCount, setInternalCount] = useState<number>(
    initialSelected ? 1 : 0
  );

  // 外部からcountが渡された場合、内部状態を同期
  useEffect(() => {
    if (effectCount !== undefined) {
      setInternalCount(effectCount);
    }
  }, [effectCount]);

  const currentCount = effectCount !== undefined ? effectCount : internalCount;

  const handleClick = () => {
    if (!disabled) {
      const newCount = currentCount >= count ? 0 : currentCount + 1;

      // 外部制御されていない場合のみ内部状態を更新
      if (effectCount === undefined) {
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
      {count !== 1 && currentCount > 0 ? (
        <div className="text-xs font-bold">×{currentCount}</div>
      ) : (
        ""
      )}
    </button>
  );
};

export default ButtonCount;
