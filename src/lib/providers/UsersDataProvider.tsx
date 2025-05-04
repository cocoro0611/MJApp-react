"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import type { UserData } from "../models/users/type";
import { readUsers } from "../models/users/read";

interface UsersDataProviderProps {
  children: ReactNode;
}

export const UsersDataContext = createContext<UserData[]>([]);

export const UsersDataProvider = ({ children }: UsersDataProviderProps) => {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    readUsers().then(setUsers);
  }, []);

  return (
    <UsersDataContext.Provider value={users}>
      {children}
    </UsersDataContext.Provider>
  );
};
