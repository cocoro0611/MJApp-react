"use client";

import { useSession } from "next-auth/react";

export const useShowPointsClient = (isShowPoint?: boolean) => {
  const { data: session } = useSession();
  const isMonitor = session?.user.groups?.includes("monitor") || false;
  const showPoint = isShowPoint ?? true;

  // isMonitor = false, isShowPoint = true  → 表示 ✅
  // isMonitor = false, isShowPoint = false → 非表示 ✅
  // isMonitor = true,  isShowPoint = true  → 非表示 ✅
  // isMonitor = true,  isShowPoint = false → 非表示 ✅
  return showPoint && !isMonitor;
};
