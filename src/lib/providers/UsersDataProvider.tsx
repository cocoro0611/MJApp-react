"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import type { ReadUser } from "../models/users/type";
import { readUsers } from "../models/users";

interface UsersDataProviderProps {
  children: ReactNode;
}

export const UsersDataContext = createContext<ReadUser[]>([]);

export const UsersDataProvider = ({ children }: UsersDataProviderProps) => {
  const [users, setUsers] = useState<ReadUser[]>([]);

  useEffect(() => {
    readUsers().then(setUsers);
  }, []);

  return (
    <UsersDataContext.Provider value={users}>
      {children}
    </UsersDataContext.Provider>
  );
};
