import { ReactNode } from "react";

interface BoxProps {
  children: ReactNode;
}

const Box = ({ children }: BoxProps) => {
  return (
    <div
      className="bg-secondary-100 text-secondary-800 border-2 border-secondary-300
      rounded p-4 w-80 lg:w-120 font-bold mb-10"
    >
      {children}
    </div>
  );
};

export default Box;
