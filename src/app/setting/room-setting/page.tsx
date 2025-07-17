import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import Box from "@/src/components/ui/Box";
import SettingForm from "@/src/template/setting/SettingForm";
import { readSetting } from "@/src/lib/models/setting";
import { readDefaultUsers } from "@/src/lib/models/users";
import { DEFAULT_GAME_RULES } from "@/src/constants/gameRules";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const SettingPage = async () => {
  const session = await getServerSession(authOptions);
  const isMonitor = session?.user.groups?.includes("monitor") || false;

  const roomUsers = await readDefaultUsers();
  const setting = await readSetting();
  const isShowPoint = setting?.isShowPoint ?? true;

  // isMonitor = false, isShowPoint = true  → 表示 ✅
  // isMonitor = false, isShowPoint = false → 非表示 ✅
  // isMonitor = true,  isShowPoint = true  → 非表示 ✅
  // isMonitor = true,  isShowPoint = false → 非表示 ✅
  const shouldShowPoints = isShowPoint && !isMonitor;
  return (
    <>
      <Header title="ルーム設定" href="/setting" />
      <Content>
        <Box>
          <div>ルーム作成時に使用する</div>
          <div className="mb-4">デフォルト設定を選択してください。</div>
          <div className="text-sm center">
            <div className="text-left">
              <p>
                現在の持ち点：
                {setting.defaultInitialPoint || DEFAULT_GAME_RULES.initialPoint}
              </p>
              <p>
                現在の返し点：
                {setting.defaultReturnPoint || DEFAULT_GAME_RULES.returnPoint}
              </p>
              <p>
                現在のウマ　：
                {setting.defaultBonusPoint || DEFAULT_GAME_RULES.bonusPoint}
              </p>
              {shouldShowPoints && (
                <>
                  <p>
                    現在のレート：
                    {setting.defaultReturnPoint || DEFAULT_GAME_RULES.scoreRate}
                  </p>
                  <p>
                    現在のチップ：
                    {setting.defaultChipRate || DEFAULT_GAME_RULES.chipRate}
                  </p>
                </>
              )}
            </div>
          </div>
        </Box>
        <SettingForm roomUsers={roomUsers} setting={setting} />
      </Content>
    </>
  );
};

export default SettingPage;
