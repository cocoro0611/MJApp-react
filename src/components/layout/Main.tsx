import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
  isBlank?: boolean;
  className?: string;
}

const Main = ({ children, isBlank = true, className = "" }: MainProps) => {
  return (
    <main
      className={`${className} 
      ${isBlank ? "center mx-8 sm:mx-16 md:mx-32" : ""}`}
    >
      {children}
    </main>
  );
};

export default Main;
