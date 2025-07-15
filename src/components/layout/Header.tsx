import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";
import { ReactNode } from "react";

interface HeaderProps {
  title: string | ReactNode;
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
      <header className="fixed top-0 left-0 right-0 z-30 lg:left-0 lg:ml-64">
        <div className="container mx-auto bg-primary-800 text-white lg:bg-white lg:text-primary-800 lg:border-b lg:border-gray-200 lg:shadow">
          <div className="center lg:p-4">
            <Link href={href} className="w-1/6 py-2">
              {showBackButton && <ArrowBackIosIcon />}
            </Link>
            <h1 className="w-4/6 py-2 font-bold text-lg lg:text-xl lg:flex-1">
              {title}
            </h1>
            <div className="w-1/6 py-2">{children}</div>
          </div>
          {extra && <div>{extra}</div>}
        </div>
      </header>
      <div className="pb-20 lg:pb-30" />
    </>
  );
};

export default Header;
