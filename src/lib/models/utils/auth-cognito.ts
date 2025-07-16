import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";

export const requireAuth = async (): Promise<string> => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("認証が必要です");
  }

  return session.user.id;
};
