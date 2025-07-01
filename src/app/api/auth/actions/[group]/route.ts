import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../[...nextauth]/route";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ group: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { group } = await params;

    if (!session.user?.groups?.includes(group)) {
      return NextResponse.json(
        { error: `${group} access required` },
        { status: 403 }
      );
    }

    console.log(`${group} 処理実行`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
