import { ReactNode } from "react";
import Link from "next/link";

interface CardProps {
  children: ReactNode;
  href: string;
  className?: string;
}

const Card = ({ children, href, className = "" }: CardProps) => {
  return (
    <Link
      href={href}
      className={`secondary card-border font-bold ${className}`}
    >
      {children}
    </Link>
  );
};

export default Card;
