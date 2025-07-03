"use client";

import Dialog from "../nav/Dialog";
import Button from "../ui/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSession, signOut } from "next-auth/react";
import { useDialog } from "@/src/hooks/ui/useDialog";

const LogoutForm = () => {
  const { data: session } = useSession();
  const { isOpen, openDialog, closeDialog } = useDialog();

  const handleLogout = async () => {
    // 1. NextAuthからサインアウト
    await signOut({ redirect: false });

    // 2. Cognitoのログアウト用URLを取得してリダイレクト
    const response = await fetch("/api/auth/logout", { method: "POST" });
    const { logoutUrl } = await response.json();
    window.location.href = logoutUrl;
  };

  return (
    <>
      <div onClick={openDialog}>{session && <LogoutIcon />}</div>

      <Dialog
        open={isOpen}
        close={closeDialog}
        title="ログアウトの確認"
        message="本当にログアウトしますか？"
      >
        <div className="grid grid-cols-2 gap-4">
          <Button color="cancel" onClick={closeDialog}>
            キャンセル
          </Button>
          <Button color="danger" onClick={handleLogout}>
            ログアウト
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default LogoutForm;
