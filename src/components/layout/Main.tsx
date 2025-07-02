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
      ${isBlank ? "center flex-col mx-8" : ""}`}
    >
      {children}
    </main>
  );
};

export default Main;
