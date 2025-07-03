import { ReactNode } from "react";
import Link from "next/link";

interface CardProps {
  children: ReactNode;
  href?: string;
  isColor?: boolean;
  border?: "sm" | "md" | "lg";
  isEffect?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Card = ({
  children,
  href = "",
  isColor = true,
  border = "md",
  isEffect = true,
  className = "",
  disabled = false,
  onClick,
}: CardProps) => {
  const borderClasses = {
    sm: "border-l-3 border-primary-500",
    md: "border-l-6 border-primary-500",
    lg: "border-l-9 border-primary-500",
  };

  return (
    <Link
      href={href}
      className={`rounded-lg font-bold shadow-xl
      ${isColor ? "bg-primary-50 text-primary-800" : "border border-gray-200"} 
      ${borderClasses[border]}
      ${isEffect ? "effect-scale" : ""}
      ${disabled ? "effect-disabled" : ""}
      ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Card;
