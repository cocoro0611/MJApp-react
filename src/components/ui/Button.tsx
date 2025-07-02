"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  color?:
    | "primary"
    | "primary-light"
    | "secondary"
    | "danger"
    | "cancel"
    | "white"
    | "toggle-on"
    | "toggle-off"
    | "toggle-disabled";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
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
  const btnClass = `effect-scale ${color} ${className} ${disabled ? "effect-disabled" : ""} `;

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
