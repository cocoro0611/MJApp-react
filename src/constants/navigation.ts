import { ComponentType } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import SettingsIcon from "@mui/icons-material/Settings";

export interface NavigationTab {
  id: string;
  label: string;
  icon: ComponentType;
  description?: string;
}

export const NAVIGATION_TABS: NavigationTab[] = [
  {
    id: "/rooms",
    label: "ルーム",
    icon: HomeIcon,
    description: "麻雀ルームの管理",
  },
  {
    id: "/users",
    label: "ユーザー",
    icon: PersonIcon,
    description: "ユーザーの管理",
  },
  {
    id: "/calculation",
    label: "計算",
    icon: CalculateOutlinedIcon,
    description: "点数計算ツール",
  },
  {
    id: "/setting",
    label: "設定",
    icon: SettingsIcon,
    description: "アプリの設定",
  },
];
