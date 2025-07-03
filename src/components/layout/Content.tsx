import { ReactNode } from "react";

interface ContentProps {
  children: ReactNode;
  isBlank?: boolean;
  className?: string;
}

const Content = ({
  children,
  isBlank = true,
  className = "",
}: ContentProps) => {
  return (
    <main
      className={`${className} 
      ${isBlank ? "center flex-col mx-8" : ""}`}
    >
      {children}
    </main>
  );
};

export default Content;
