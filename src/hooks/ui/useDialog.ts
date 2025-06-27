import { useState, useEffect } from "react";

export const useDialog = (initialOpen: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  // ESCキーで閉じる機能
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeDialog();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return {
    isOpen,
    openDialog,
    closeDialog,
  };
};
