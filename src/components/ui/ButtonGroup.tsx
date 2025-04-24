"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface ButtonGroupProps {
  tabs: TabItem[];
  color: "blue-active" | "red-active";
  className?: string;
}

const ButtonGroup = ({ tabs, color, className = "" }: ButtonGroupProps) => {
  const pathname = usePathname();

  return (
    <>
      {tabs.map((tab, index) => (
        <Link
          href={tab.id}
          key={tab.id}
          className={`border-y border-r border-gray-500 
        ${index === 0 ? "rounded-l-lg border-l" : ""}
        ${index === tabs.length - 1 ? "rounded-r-lg" : ""}
        ${pathname === tab.id ? color : "inactive"}
        ${className}`}
        >
          <span>{tab.icon && tab.icon}</span>
          <span>{tab.label}</span>
        </Link>
      ))}
    </>
  );
};

export default ButtonGroup;
