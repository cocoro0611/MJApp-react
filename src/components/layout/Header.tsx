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
      <header className="fixed-container top-0 z-30 bg-primary-800 text-white">
        <div className="center">
          <Link href={href} className="w-1/6 md:w-1/12 py-2">
            {isBackIcon && <ArrowBackIosIcon />}
          </Link>
          <div className="w-4/6 md:w-10/12 py-2 font-bold text-lg">{title}</div>
          <div className="w-1/6 md:w-1/12 py-2">{children}</div>
        </div>
        <div>{addContent}</div>
      </header>
      {/* Headerを固定しているためスペースを確保 */}
      <div className={bottomSpace} />
    </>
  );
};

export default Header;
