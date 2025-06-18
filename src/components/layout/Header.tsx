import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";
import { ReactNode } from "react";

interface HeaderProps {
  title: string;
  href?: string;
  isBackIcon?: boolean;
  children?: ReactNode;
}

const Header = ({
  title,
  href = "",
  isBackIcon = true,
  children,
}: HeaderProps) => {
  return (
    <>
      <header className="header-container center">
        <Link href={href} className="w-1/12 py-2">
          {isBackIcon && <ArrowBackIosIcon />}
        </Link>
        <div className="w-5/6 py-2 font-bold text-lg">{title}</div>
        <div className="w-1/12 py-2">{children}</div>
      </header>
      <div className="pb-20"></div>
    </>
  );
};

export default Header;
