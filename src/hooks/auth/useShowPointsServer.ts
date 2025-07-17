import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";

export const useShowPointsServer = async (isShowPoint?: boolean) => {
  const session = await getServerSession(authOptions);
  const isMonitor = session?.user.groups?.includes("monitor") || false;
  const showPoint = isShowPoint ?? true;

  // isMonitor = false, isShowPoint = true  → 表示 ✅
  // isMonitor = false, isShowPoint = false → 非表示 ✅
  // isMonitor = true,  isShowPoint = true  → 非表示 ✅
  // isMonitor = true,  isShowPoint = false → 非表示 ✅
  return showPoint && !isMonitor;
};
