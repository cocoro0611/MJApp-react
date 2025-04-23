"use client";

import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  const tabs = [
    { id: "/", label: "ホーム", icon: <HomeIcon /> },
    { id: "/users", label: "メンバー", icon: <PersonIcon /> },
    { id: "/fu-count", label: "符数計算", icon: <CalculateOutlinedIcon /> },
    { id: "/han-count", label: "翻数計算", icon: <CalculateOutlinedIcon /> },
  ];

  return (
    // <footer className="footer-container center">
    //   <div className="container-width grid grid-cols-2">
    //     <Link href="/" className="center bg-blue-900">
    //       <button>
    //         <HomeIcon />
    //         <div>ホーム</div>
    //       </button>
    //     </Link>
    //     <Link href="/users" className="center bg-blue-100">
    //       <button>
    //         <PersonIcon />
    //         <div>メンバー</div>
    //       </button>
    //     </Link>
    //   </div>
    // </footer>
    <nav className="fixed bottom-0 left-0 right-0 font-bold">
      <div className="flex max-w-screen-lg w-full mx-auto">
        {tabs.map((tab, index) => (
          <Link
            href={tab.id}
            key={tab.id}
            className={`flex flex-1 py-2 items-center justify-center flex-col md:flex-row
            border-y border-r border-gray-500
            ${index === 0 ? "rounded-l-lg border-l" : ""}
            ${index === tabs.length - 1 ? "rounded-r-lg" : ""}
            ${pathname === tab.id ? "bg-blue-800 border-blue-800 text-white hover:bg-blue-900" : "bg-white text-black hover:bg-gray-100"}
          `}
          >
            {tab.icon}
            <span className="text-sm">{tab.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Footer;
