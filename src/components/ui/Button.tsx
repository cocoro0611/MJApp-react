"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  href?: string;
  isFixed?: boolean;
  color?:
    | "primary"
    | "secondary"
    | "danger"
    | "cancel"
    | "white"
    | "toggle-active"
    | "toggle-inactive";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  children,
  href,
  isFixed = false,
  color = "primary",
  type = "button",
  disabled = false,
  className = "rounded px-4 py-2 w-full",
  onClick = () => {},
}: ButtonProps) => {
  const btnClass = `effect-scale ${color} ${className} ${disabled ? "effect-disabled" : ""} `;

  // isFixed Button
  if (href && isFixed) {
    return (
      <Link href={href}>
        <button
          onClick={disabled ? undefined : onClick}
          type={type}
          disabled={disabled}
          className={`fixed effect-scale ${disabled ? "effect-disabled" : ""}`}
        >
          +
        </button>
      </Link>
    );
  }

  // Link ボタン
  if (href && !disabled) {
    return (
      <Link href={href}>
        <div className={btnClass}>{children}</div>
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
      {children}
    </button>
  );
};

export default Button;
