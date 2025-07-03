import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";
import { ReactNode } from "react";

interface HeaderProps {
  title: string;
  href?: string;
  showBackButton?: boolean;
  children?: ReactNode;
  extra?: ReactNode;
}

const Header = ({
  title,
  href = "",
  showBackButton = true,
  children,
  extra,
}: HeaderProps) => {
  return (
    <>
      <header
        className="fixed-container top-0 z-30 bg-primary-800 text-white
        lg:fixed lg:left-64 lg:right-0 lg:bg-white lg:text-primary-800 lg:border-b lg:border-gray-200 lg:shadow"
      >
        <div className="center lg:p-4">
          <Link href={href} className="w-1/6 py-2">
            {showBackButton && <ArrowBackIosIcon />}
          </Link>
          <h1 className="w-4/6 py-2 font-bold text-lg lg:text-xl lg:flex-1">
            {title}
          </h1>
          <div className="w-1/6 py-2">{children}</div>
        </div>
        {extra}
      </header>
      <div className="pb-20 lg:pb-10" />
    </>
  );
};

export default Header;
