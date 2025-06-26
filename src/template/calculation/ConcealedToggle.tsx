"use client";

import Button from "@/src/components/ui/Button";

interface ConcealedToggleProps {
  isConcealed: boolean;
  setIsConcealed: (value: boolean) => void;
}

const ConcealedToggle = ({
  isConcealed,
  setIsConcealed,
}: ConcealedToggleProps) => {
  return (
    <div
      className="fixed-container top-[0.5rem] z-50 
        xl:ml-[19rem] lg:ml-[11rem] md:ml-[10rem] sm:ml-[6rem] ml-[4.5rem]"
    >
      <Button
        onClick={() => setIsConcealed(true)}
        color={isConcealed ? "toggle-active" : "toggle-inactive"}
        className="rounded-l px-4"
      >
        門前
      </Button>
      <Button
        color={isConcealed ? "toggle-inactive" : "toggle-active"}
        onClick={() => setIsConcealed(false)}
        className="rounded-r px-4"
      >
        鳴き
      </Button>
    </div>
  );
};

export default ConcealedToggle;
