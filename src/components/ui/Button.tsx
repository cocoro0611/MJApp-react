"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  href?: string;
  color?:
    | "primary"
    | "secondary"
    | "danger"
    | "cancel"
    | "white"
    | "toggle-active"
    | "toggle-inactive"
    | "fixed";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  size?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  children,
  href,
  color = "primary",
  type = "button",
  disabled = false,
  className = "rounded px-4 py-2 w-full",
  onClick = () => {},
}: ButtonProps) => {
  // colorがfixedの場合はclassNameを空文字に+を表示
  const finalClassName = color === "fixed" ? "" : className;
  const displayContent = color === "fixed" ? "+" : children;

  const btnClass = `effect-scale 
  ${color}
  ${disabled ? "effect-disabled" : ""} 
  ${finalClassName}`;

  // Link ボタン
  if (href && !disabled) {
    return (
      <Link href={href}>
        <div className={btnClass}>{displayContent}</div>
      </Link>
    );
  }

  // 通常のボタン
  return (
    <button
      onClick={disabled ? undefined : onClick}
      type={type}
      disabled={disabled}
      className={btnClass}
    >
      {displayContent}
    </button>
  );
};

export default Button;
