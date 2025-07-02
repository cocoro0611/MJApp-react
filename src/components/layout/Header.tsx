import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";
import { ReactNode } from "react";

interface HeaderProps {
  title: string;
  href?: string;
  isBackIcon?: boolean;
  children?: ReactNode;
  addContent?: ReactNode;
  bottomSpace?: string;
}

const Header = ({
  title,
  href = "",
  isBackIcon = true,
  children,
  addContent,
  bottomSpace = "pb-20",
}: HeaderProps) => {
  return (
    <>
      <header
        className="fixed-container top-0 z-30 bg-primary-800 text-white 
        lg:fixed lg:left-64 lg:right-0 lg:bg-white lg:text-primary-800 lg:border-b lg:border-gray-200 lg:shadow"
      >
        <div className="center lg:flex lg:items-center lg:p-4">
          <Link href={href} className="w-1/6 py-2 lg:w-auto lg:mr-4">
            {isBackIcon && <ArrowBackIosIcon />}
          </Link>
          <div className="w-4/6 py-2 font-bold text-lg lg:w-auto lg:flex-1">
            {title}
          </div>
          <div className="w-1/6 py-2 lg:w-auto">{children}</div>
        </div>
        <div>{addContent}</div>
      </header>
      <div className={`${bottomSpace} lg:pb-10`} />
    </>
  );
};

export default Header;
