import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit";
  className?: string;
}

const Button = ({ children, type = "submit", className = "" }: ButtonProps) => {
  return (
    <button type={type} className={`primary rounded p-4 ${className}`}>
      {children}
    </button>
  );
};

export default Button;
