"use client";

import Button from "@/src/components/ui/Button";
import { useClickSound } from "@/src/hooks/sounds/useClickSound";

interface ConcealedToggleProps {
  isConcealed: boolean;
  setIsConcealed: (value: boolean) => void;
}

const ConcealedToggle = ({
  isConcealed,
  setIsConcealed,
}: ConcealedToggleProps) => {
  const { playClick } = useClickSound();

  return (
    <div>
      <Button
        onClick={() => {
          playClick();
          setIsConcealed(true);
        }}
        color={isConcealed ? "toggle-on" : "toggle-off-disabled"}
        className="rounded-l px-3 py-1 text-sm lg:text-xl"
      >
        門前
      </Button>
      <Button
        color={isConcealed ? "toggle-off-disabled" : "toggle-on"}
        onClick={() => {
          playClick();
          setIsConcealed(false);
        }}
        className="rounded-r px-3 py-1 text-sm lg:text-xl"
      >
        鳴き
      </Button>
    </div>
  );
};

export default ConcealedToggle;
