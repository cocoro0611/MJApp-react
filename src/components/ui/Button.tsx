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
    | "toggle-off-disabled"
    | "toggle-secondary-on"
    | "toggle-secondary-off"
    | "toggle-secondary-off-disabled"
    | "none";
  border?: "primary-light-border" | "cancel-border" | "none";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  children,
  href,
  color = "primary",
  border = "none",
  type = "button",
  disabled = false,
  className = "rounded px-4 py-2 w-full",
  onClick = () => {},
}: ButtonProps) => {
  const btnClass = `effect-scale 
  ${color !== "none" ? color : ""}
  ${border !== "none" ? border : ""}
  ${className} ${disabled ? "effect-disabled" : ""} `;

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
