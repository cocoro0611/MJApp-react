"use client";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { usePathname } from "next/navigation";
import Link from "next/link";

const headerTitles: { [key: string]: string } = {
  "/": "ホーム",
  "/users": "ユーザー一覧",
  "/users/new": "ユーザー作成",
  "/fu-count": "符数計算",
  "/han-count": "翻数計算",
};

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="header-container center primary ">
      <div className="container-width center">
        <Link href="/" className="w-1/12 py-2">
          <ArrowBackIosIcon />
        </Link>
        <div className="w-5/6 py-2">{headerTitles[pathname]}</div>
        <Link href="/" className="w-1/12 py-2">
          <DeleteOutlineIcon />
        </Link>
      </div>
    </header>
  );
};

export default Header;
