"use client";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { usePathname } from "next/navigation";

const headerTitles: { [key: string]: string } = {
  "/": "ホーム",
  "/users": "メンバー",
  "/fu-count": "符数計算",
  "/han-count": "翻数計算",
};

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="header-container center primary ">
      <div className="container-width center">
        <ArrowBackIosIcon className="w-1/12" />
        <div className="w-5/6 py-2">{headerTitles[pathname]}</div>
        <DeleteOutlineIcon className="w-1/12" />
      </div>
    </header>
  );
};

export default Header;
