"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION_TABS } from "@/src/constants/navigation";

const Footer = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed-container bottom-0 z-10 center">
      {NAVIGATION_TABS.map((tab, index) => {
        const IconComponent = tab.icon;
        const isActive = pathname.startsWith(tab.id);

        return (
          <Link
            href={tab.id}
            key={tab.id}
            className={`
              border-y border-r border-gray-500 center flex-col flex-1 py-2 
              ${index === 0 ? "rounded-l-lg border-l" : ""}
              ${index === NAVIGATION_TABS.length - 1 ? "rounded-r-lg" : ""}
              ${isActive ? "primary" : "white"}
            `}
          >
            <span>
              <IconComponent />
            </span>
            <span className="font-bold text-sm">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Footer;
