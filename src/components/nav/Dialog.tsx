import { ReactNode } from "react";

interface DialogProps {
  children: ReactNode;
  open: boolean;
  close: () => void;
  title?: string;
  message?: string;
}

const Dialog = ({
  children,
  open,
  close,
  title = "",
  message = "",
}: DialogProps) => {
  return (
    <>
      {open && (
        <div
          className="center fixed z-30 inset-0 bg-black/50 backdrop-blur-xs"
          onClick={close}
        >
          <div
            className="bg-white rounded-xl p-8 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()} // モーダル内のクリックでダイアログが閉じないように制御
          >
            <div className="text-xl font-bold mb-2">{title}</div>
            <div className="text-gray-800 mb-8">{message}</div>
            <div className="center gap-4">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;
