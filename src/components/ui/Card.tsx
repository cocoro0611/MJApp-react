import { ReactNode } from "react";
import Link from "next/link";

interface CardProps {
  children: ReactNode;
  href?: string;
  isColor?: boolean;
  className?: string;
}

const Card = ({
  children,
  href = "",
  isColor = true,
  className = "",
}: CardProps) => {
  return (
    <Link
      href={href}
      className={`scale-effect rounded-lg font-bold 
      ${isColor ? "secondary" : "border-2 border-gray-200"} ${className}`}
    >
      {children}
    </Link>
  );
};

export default Card;
