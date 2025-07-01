import { ReactNode } from "react";
import Link from "next/link";

interface CardProps {
  children: ReactNode;
  href?: string;
  isColor?: boolean;
  isEffect?: boolean;
  className?: string;
  onClick?: () => void;
}

const Card = ({
  children,
  href = "",
  isColor = true,
  isEffect = true,
  className = "",
  onClick,
}: CardProps) => {
  return (
    <Link
      href={href}
      className={`rounded-lg font-bold 
      ${isColor ? "primary-light" : "border border-gray-200"} 
      ${isEffect ? "effect-scale" : ""}
      ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Card;
