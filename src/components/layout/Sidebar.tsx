"use client";

import Link from "next/link";
import LogoutForm from "../form/LogoutForm";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { NAVIGATION_TABS } from "@/src/constants/navigation";

interface SidebarProps {
  className: string;
}

const Sidebar = ({ className = "" }: SidebarProps) => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className={className}>
      <div
        className="flex flex-col fixed top-0 bottom-0 left-0 z-50
      bg-primary-800 text-white w-64"
      >
        {/* Logo/Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-white-800 px-4">麻雀計算</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 font-bold">
          <ul className="space-y-2">
            {NAVIGATION_TABS.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = pathname.startsWith(tab.id);

              return (
                <li key={tab.id}>
                  <Link
                    href={tab.id}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg effect-scale
                    ${
                      isActive
                        ? "bg-primary-100 text-primary-800 border-l-6 border-primary-500"
                        : "text-white hover:bg-primary-700 hover:text-gray-200 hover:border-l-6 hover:border-primary-600"
                    }`}
                  >
                    <span>
                      <IconComponent />
                    </span>
                    <span>{tab.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User section */}
        {session && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="center w-8 h-8 rounded-full bg-primary-500">
                  <span className="text-white text-sm">
                    {session.user?.name?.charAt(0) || "U"}
                  </span>
                </div>
                <div className="text-sm text-white">
                  <p className="truncate">{session.user?.name || "ユーザー"}</p>
                  {session.user?.groups && (
                    <p>
                      {session.user.groups.includes("admin")
                        ? "管理者"
                        : "一般"}
                    </p>
                  )}
                </div>
              </div>
              <div className="ml-2">
                <LogoutForm />
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
