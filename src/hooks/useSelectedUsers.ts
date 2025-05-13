"use client";

import { useState } from "react";
import type { UserData } from "@/src/lib/models/users/type";

export const useSelectedUsers = (allUsers: UserData[]) => {
  const [selectedUsers, setSelectedUsers] = useState<UserData[]>(() =>
    allUsers.filter((user) => user.defaultSelected === true)
  );

  const toggleUser = (user: UserData) => {
    setSelectedUsers((prev) => {
      const isSelected = prev.some((u) => u.id === user.id);

      if (isSelected) {
        return prev.filter((u) => u.id !== user.id);
      } else if (prev.length < 4) {
        return [...prev, user];
      }
      return prev;
    });
  };

  const isSelected = (user: UserData) => {
    return selectedUsers.some((u) => u.id === user.id);
  };

  return { selectedUsers, toggleUser, isSelected };
};
