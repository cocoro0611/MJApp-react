"use client";

import { useState } from "react";
import { MAX_ROOM_PLAYERS } from "../constants/gameRules";
import type { ReadUserData } from "@/src/lib/models/users/type";

const useUserSelect = (users: ReadUserData[]) => {
  // 初期値：isDefaultUserがtrueのユーザーを取得
  const getDefaultUsers = () => {
    return users.filter((user) => user.isDefaultUser).map((user) => user.id);
  };

  const [selectedUsers, setSelectedUsers] = useState<string[]>(getDefaultUsers);

  // 選択状態を切り替え
  const toggleUser = (userId: string) => {
    const isUserSelected = selectedUsers.includes(userId);

    if (isUserSelected) {
      // 選択解除
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
    } else {
      // 選択追加（上限チェック）
      if (selectedUsers.length < MAX_ROOM_PLAYERS) {
        setSelectedUsers((prev) => [...prev, userId]);
      }
    }
  };

  // 選択状態の確認：親コンポーネントのカードの色制御で利用
  const isUserSelected = (userId: string) => {
    return selectedUsers.includes(userId);
  };

  // 選択完了の確認：親コンポーネントのボタンの活性制御で利用
  const isReady = () => {
    return selectedUsers.length === MAX_ROOM_PLAYERS;
  };

  return {
    selectedUsers,
    toggleUser,
    isUserSelected,
    isReady,
  };
};

export default useUserSelect;
