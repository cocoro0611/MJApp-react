"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  color?:
    | "primary"
    | "secondary"
    | "danger"
    | "cancel"
    | "white"
    | "setting-on"
    | "setting-off";
  custom?: boolean;
  effect?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button = ({
  children,
  color = "primary",
  custom = false,
  effect = true,
  type = "submit",
  disabled = false,
  className = "",
  onClick = () => {},
}: ButtonProps) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      type={type}
      disabled={disabled}
      className={`
      ${color}
      ${custom ? className : "rounded px-4 py-2"} 
      ${effect ? "scale-effect" : ""} 
      ${disabled ? "disabled-effect" : ""}  
      `}
    >
      {children}
    </button>
  );
};

export default Button;
