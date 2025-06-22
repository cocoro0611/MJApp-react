"use client";

import { useState } from "react";

export const useKeyboard = () => {
  const [display, setDisplay] = useState("0");
  const [waitingForValue, setWaitingForValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForValue) {
      setDisplay(num);
      setWaitingForValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const signNum = () => {
    if (display === "0") return;

    if (display.startsWith("-")) {
      setDisplay(display.slice(1));
    } else {
      setDisplay("-" + display);
    }
  };

  const deleteNum = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };

  return {
    display,
    setDisplay,
    inputNumber,
    signNum,
    deleteNum,
  };
};
