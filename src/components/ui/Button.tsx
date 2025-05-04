"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  color?: "primary" | "secondary" | "danger" | "cancel" | "inactive";
  type?: "button" | "submit";
  className?: string;
}

const Button = ({
  children,
  onClick = () => {},
  color = "primary",
  type = "submit",
  className = "",
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`rounded px-4 py-2 ${color} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
