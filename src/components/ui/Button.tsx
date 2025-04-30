import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  color?: "primary" | "secondary" | "danger" | "inactive";
  type?: "button" | "submit";
  className?: string;
}

const Button = ({
  children,
  color = "primary",
  type = "submit",
  className = "",
}: ButtonProps) => {
  return (
    <button type={type} className={`rounded  px-4 py-2 ${color} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
