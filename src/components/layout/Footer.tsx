"use client";

import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import ButtonGroup from "../ui/ButtonGroup";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  const tabs = [
    { href: "/", label: "ホーム", icon: <HomeIcon /> },
    { href: "/users", label: "メンバー", icon: <PersonIcon /> },
    { href: "/fu-count", label: "符数計算", icon: <CalculateOutlinedIcon /> },
    { href: "/han-count", label: "翻数計算", icon: <CalculateOutlinedIcon /> },
  ];

  return (
    <nav className="nav-container center">
      <div className="container-width center">
        {tabs.map((tab, index) => (
          <ButtonGroup
            href={tab.href}
            index={index}
            totalButtons={4}
            className={`center flex-1 flex-col md:flex-row py-2
            ${pathname === tab.href ? "active" : "inactive"}
            `}
          >
            {tab.icon}
            <button>{tab.label}</button>
          </ButtonGroup>
        ))}
      </div>
    </nav>
  );
};

export default Footer;
