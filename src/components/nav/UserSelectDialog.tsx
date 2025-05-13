"use client";

import { useState } from "react";
import Dialog from "./Dialog";
import Button from "../ui/Button";
import Image from "next/image";
import type { UserData } from "@/src/lib/models/users/type";

interface UserSelectDialogProps {
  users: UserData[];
  selectedUsers: UserData[];
  toggleUser: (user: UserData) => void;
  isSelected: (user: UserData) => boolean;
}

const UserSelectDialog = ({
  users,
  selectedUsers,
  toggleUser,
  isSelected,
}: UserSelectDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="setting-custom-btn scale-effect"
        onClick={handleOpen}
      >
        カスタム
      </button>

      <Dialog
        open={open}
        close={handleClose}
        title="ユーザー選択"
        message={`${selectedUsers.length}/4人選択中`}
      >
        <div className="flex-col">
          <div className="grid grid-cols-3 gap-4 max-h-60 overflow-y-auto">
            {users.map((user) => (
              <div
                key={user.id}
                className={`p-4 rounded-lg border cursor-pointer ${
                  isSelected(user)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => toggleUser(user)}
              >
                <Image src={user.icon} alt="user-icon" width={50} height={50} />
                <div className="text-sm text-blue-800 font-bold mt-2">
                  {user.name}
                </div>
                {isSelected(user) && (
                  <div className="text-blue-500 text-xs mt-1">選択中</div>
                )}
              </div>
            ))}
          </div>
          <div className="center gap-4 pt-8">
            <Button
              type="button"
              onClick={handleClose}
              color="cancel"
              className="w-32"
            >
              キャンセル
            </Button>
            <Button
              type="button"
              onClick={handleClose}
              color="primary"
              disabled={selectedUsers.length === 0}
              className="w-32"
            >
              選択する
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default UserSelectDialog;
