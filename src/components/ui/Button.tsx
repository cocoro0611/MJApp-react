"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  color?: "primary" | "secondary" | "danger" | "cancel" | "inactive";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

const Button = ({
  children,
  onClick = () => {},
  color = "primary",
  type = "submit",
  disabled = false,
  className = "",
}: ButtonProps) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      type={type}
      disabled={disabled}
      className={`rounded px-4 py-2 cursor-not-allowed 
      ${color}
      ${disabled ? "cursor-not-allowed opacity-50" : ""}  
      ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
