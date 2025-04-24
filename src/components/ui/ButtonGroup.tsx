"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface ButtonGroupProps {
  children: ReactNode;
  href: string;
  index: number;
  totalButtons: number;
  className?: string;
}

const ButtonGroup = ({
  children,
  href,
  index,
  totalButtons,
  className = "",
}: ButtonGroupProps) => {
  return (
    <Link
      href={href}
      className={`border-y border-r border-gray-500 
        ${index === 0 ? "rounded-l-lg border-l" : ""}
        ${index === totalButtons - 1 ? "rounded-r-lg" : ""}
        ${className}`}
    >
      {children}
    </Link>
  );
};

export default ButtonGroup;
