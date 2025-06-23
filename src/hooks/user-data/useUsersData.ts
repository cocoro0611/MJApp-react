"use client";

import { useContext } from "react";
import { UsersDataContext } from "@/src/lib/providers/UsersDataProvider";

export const useUsersData = () => {
  return useContext(UsersDataContext);
};
