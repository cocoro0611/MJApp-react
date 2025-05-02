import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => {
  return <main className="center mx-8 md:mx-16 text-gray-800">{children}</main>;
};

export default Main;
