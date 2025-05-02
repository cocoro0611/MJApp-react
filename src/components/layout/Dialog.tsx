"use client";

import { useState } from "react";
import Button from "../ui/Button";

const Dialog = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button type="button" onClick={handleClickOpen}>
        Open alert dialog
      </Button>

      {/* モーダルの背景オーバーレイ */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300"
          onClick={handleClose}
        >
          {/* モーダルコンテンツ */}
          <div
            className="bg-white rounded-xl p-8 max-w-sm w-full mx-4 shadow-xl transform transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-2">確認</h2>
            <p className="mb-8 text-gray-600">本当に削除しますか？</p>

            <div className="center gap-4">
              <Button type="button" onClick={handleClose} color="secondary">
                キャンセル
              </Button>
              <Button type="button" onClick={handleClose} color="danger">
                削除する
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dialog;
