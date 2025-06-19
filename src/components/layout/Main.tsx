import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
  isBlank?: boolean;
}

const Main = ({ children, isBlank = true }: MainProps) => {
  return (
    <main className={isBlank ? "center mx-8 sm:mx-16 md:mx-32" : ""}>
      {children}
    </main>
  );
};

export default Main;
