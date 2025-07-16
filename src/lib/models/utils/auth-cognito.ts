import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const requireAuth = async (redirectTo?: string): Promise<string> => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    const callbackUrl = redirectTo || "/setting/room-setting";
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  return session.user.id;
};
