"use client";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();

  const getTitle = () => {
    const patterns = [
      { regex: /^\/rooms$/, title: "ルーム" },
      { regex: /^\/rooms\/new$/, title: "ルーム作成" },
      { regex: /^\/rooms\/[^/]+$/, title: "ルーム詳細" },
      { regex: /^\/rooms\/[^/]+\/edit$/, title: "ルーム編集" },
      { regex: /^\/users$/, title: "ユーザー" },
      { regex: /^\/users\/new$/, title: "ユーザー作成" },
      { regex: /^\/users\/[^/]+$/, title: "ユーザー詳細" },
      { regex: /^\/users\/[^/]+\/edit$/, title: "ユーザー編集" },
      { regex: /^\/fu-count$/, title: "符数計算" },
      { regex: /^\/han-count$/, title: "翻数計算" },
    ];

    const match = patterns.find((p) => p.regex.test(pathname));
    return match ? match.title : "";
  };

  return (
    <header className="header-container center">
      <div className="container-width center">
        <Link href="/" className="w-1/12 py-2">
          <ArrowBackIosIcon />
        </Link>
        <div className="w-5/6 py-2">{getTitle()}</div>
        <Link href="/" className="w-1/12 py-2">
          <DeleteOutlineIcon />
        </Link>
      </div>
    </header>
  );
};

export default Header;
