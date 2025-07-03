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
    <div className="fixed top-[0.5rem] lg:top-[1.6rem] z-50 font-bold ml-22 lg:ml-50 ] ">
      <Button
        onClick={() => setIsConcealed(true)}
        color={isConcealed ? "toggle-on" : "toggle-disabled"}
        className="rounded-l px-4"
      >
        門前
      </Button>
      <Button
        color={isConcealed ? "toggle-disabled" : "toggle-on"}
        onClick={() => setIsConcealed(false)}
        className="rounded-r px-4 "
      >
        鳴き
      </Button>
    </div>
  );
};

export default ConcealedToggle;
