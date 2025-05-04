"use client";

import { useContext } from "react";
import { UsersDataContext } from "../lib/providers/UsersDataProvider";

export const useUsersData = () => {
  return useContext(UsersDataContext);
};
