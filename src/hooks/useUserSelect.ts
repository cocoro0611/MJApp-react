"use client";

import { useState } from "react";
import type { UserData } from "@/src/lib/models/users/type";

// FIXME: なぜか動いているので確認が必要
const useUserSelect = (users: UserData[], maxSelection: number = 4) => {
  // 初期状態：defaultSelectedがtrueのユーザーのIDを取得
  const getDefaultSelectedUserIds = () => {
    return users.filter((user) => user.defaultSelected).map((user) => user.id);
  };

  const [selectedUserIds, setSelectedUserIds] = useState<string[]>(
    getDefaultSelectedUserIds
  );

  // ユーザーの選択状態を切り替える関数
  const toggleUser = (userId: string) => {
    const isUserSelected = selectedUserIds.includes(userId);

    if (isUserSelected) {
      removeUserFromSelection(userId);
    } else {
      addUserToSelection(userId);
    }
  };

  // ユーザーを選択リストに追加
  const addUserToSelection = (userId: string) => {
    if (selectedUserIds.length < maxSelection) {
      setSelectedUserIds((prev) => [...prev, userId]);
    }
  };

  // ユーザーを選択リストから削除
  const removeUserFromSelection = (userId: string) => {
    setSelectedUserIds((prev) => prev.filter((id) => id !== userId));
  };

  // ユーザーが選択されているかチェック
  const isUserSelected = (userId: string) => {
    return selectedUserIds.includes(userId);
  };

  // 選択完了かどうか
  const isSelectionComplete = () => {
    return selectedUserIds.length === maxSelection;
  };

  return {
    selectedUserIds,
    toggleUser,
    isUserSelected,
    isSelectionComplete,
    selectionCount: selectedUserIds.length,
    maxSelection,
  };
};

export default useUserSelect;
