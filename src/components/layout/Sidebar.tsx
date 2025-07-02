"use client";

import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import LogoutForm from "../form/LogoutForm";

const tabs = [
  { id: "/rooms", label: "ルーム", icon: <HomeIcon /> },
  { id: "/users", label: "ユーザー", icon: <PersonIcon /> },
  { id: "/calculation", label: "計算", icon: <CalculateOutlinedIcon /> },
  { id: "/setting", label: "設定", icon: <SettingsIcon /> },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-primary-800 text-white border-gray-200 shadow-lg z-40">
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-white-800">麻雀計算</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <Link
                href={tab.id}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-150 ${
                  pathname.startsWith(tab.id)
                    ? "bg-primary-100 text-primary-800"
                    : "text-white hover:bg-primary-700 hover:text-gray-200"
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="font-bold">{tab.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User section */}
      {session && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {session.user?.name?.charAt(0) || "U"}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-white truncate">
                  {session.user?.name || "ユーザー"}
                </p>
                {session.user?.groups && (
                  <p className="text-xs text-white">
                    {session.user.groups.includes("admin") ? "管理者" : "一般"}
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
    </aside>
  );
};

export default Sidebar;
