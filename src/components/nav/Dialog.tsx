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
          className="center fixed z-20 inset-0 bg-black/50 backdrop-blur-xs"
          onClick={close}
        >
          <div
            className="bg-white rounded-xl p-8 w-7/8 max-w-md"
            onClick={(e) => e.stopPropagation()} // モーダル内のクリックでダイアログが閉じないように制御
          >
            <div className="text-gray-800 text-xl font-bold mb-2">{title}</div>
            <div className="text-gray-600 text-sm mb-8 font-semibold">
              {message}
            </div>
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;
