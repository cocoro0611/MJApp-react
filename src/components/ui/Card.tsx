import { ReactNode } from "react";
import Link from "next/link";

interface CardProps {
  children: ReactNode;
  href?: string;
  isColor?: boolean;
  className?: string;
  onClick?: () => void;
}

const Card = ({
  children,
  href = "",
  isColor = true,
  className = "",
  onClick,
}: CardProps) => {
  return (
    <Link
      href={href}
      className={`scale-effect rounded-lg font-bold 
      ${isColor ? "secondary" : "border-2 border-gray-200"} ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Card;
