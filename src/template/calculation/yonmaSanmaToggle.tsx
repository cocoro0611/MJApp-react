"use client";

import Button from "@/src/components/ui/Button";
import { useClickSound } from "@/src/hooks/sounds/useClickSound";

interface YonmaSanmaToggleProps {
  isYonma: boolean;
  setIsYonma: (value: boolean) => void;
}

const YonmaSanmaToggle = ({ isYonma, setIsYonma }: YonmaSanmaToggleProps) => {
  const { playClick } = useClickSound();

  return (
    <div>
      <Button
        onClick={() => {
          playClick();
          setIsYonma(true);
        }}
        color={
          isYonma ? "toggle-secondary-on" : "toggle-secondary-off-disabled"
        }
        className="rounded-l px-3 py-1 text-sm lg:text-xl"
      >
        四麻
      </Button>
      <Button
        color={
          isYonma ? "toggle-secondary-off-disabled" : "toggle-secondary-on"
        }
        onClick={() => {
          playClick();
          setIsYonma(false);
        }}
        className="rounded-r px-3 py-1 text-sm lg:text-xl"
      >
        三麻
      </Button>
    </div>
  );
};

export default YonmaSanmaToggle;
