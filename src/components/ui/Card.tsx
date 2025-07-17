"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface CardProps {
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
    | "toggle-off";
  leftBorder?: "sm" | "md" | "lg" | "none";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const Card = ({
  children,
  href = "",
  color = "primary-light",
  leftBorder = "none",
  disabled = false,
  className = "",
  onClick = () => {},
}: CardProps) => {
  const leftBorderClasses = {
    none: "",
    sm: "border-l-3 border-primary-500",
    md: "border-l-6 border-primary-500",
    lg: "border-l-9 border-primary-500",
  };

  // FIXME: 選択せれていない時の色の調整
  return (
    <Link
      href={href}
      className={`rounded-lg font-bold shadow-lg effect-scale
      ${color ? color : ""}
      ${leftBorderClasses[leftBorder]}
      ${disabled ? "effect-disabled" : ""}
      ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Card;
