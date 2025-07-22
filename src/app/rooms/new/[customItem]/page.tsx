import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import Box from "@/src/components/ui/Box";
import CustomForm from "@/src/template/rooms/CustomForm";
import {
  upsertDefaultInitialPoint,
  upsertDefaultReturnPoint,
  upsertDefaultBonusPoint,
  upsertDefaultScoreRate,
  upsertDefaultChipRate,
} from "@/src/lib/models/setting";

interface CustomRoomSettingPageProps {
  params: Promise<{ customItem: string }>;
}

const CustomRoomSettingPage = async ({
  params,
}: CustomRoomSettingPageProps) => {
  const { customItem } = await params;

  // customItemに応じて適切な関数を選択
  const getUpsertFunction = (item: string) => {
    switch (item) {
      case "initialPoint":
        return upsertDefaultInitialPoint;
      case "returnPoint":
        return upsertDefaultReturnPoint;
      case "bonusPoint":
        return upsertDefaultBonusPoint;
      case "scoreRate":
        return upsertDefaultScoreRate;
      case "chipRate":
        return upsertDefaultChipRate;
      default:
        return upsertDefaultInitialPoint;
    }
  };
  const upsertDefaultCustomRoom = getUpsertFunction(customItem);

  const getFieldConfig = (item: string) => {
    const configs: Record<
      string,
      {
        label: string;
        type: "number" | "text";
        maxLength: number;
        placeholder: string;
        description?: string;
        description2?: string;
      }
    > = {
      initialPoint: {
        label: "持ち点",
        type: "number",
        maxLength: 6,
        placeholder: "持ち点を入力",
      },
      returnPoint: {
        label: "返し点",
        type: "number",
        maxLength: 6,
        placeholder: "返し点を入力",
      },
      bonusPoint: {
        label: "ウマ",
        type: "text",
        maxLength: 5,
        placeholder: "ウマを入力（例: 10-30）",
        description: "「10-30」の形式で入力してください",
      },
      scoreRate: {
        label: "レート",
        type: "number",
        maxLength: 5,
        placeholder: "レートを入力（例: テンゴの場合は50）",
        description: "1000点あたりのポイントを入力",
        description2: "（テンゴ: 50、テンピン: 100）",
      },
      chipRate: {
        label: "チップ",
        type: "number",
        maxLength: 5,
        placeholder: "チップレートを入力",
      },
    };

    return (
      configs[item] || {
        label: "設定値",
        type: "text" as const,
        maxLength: 10,
        placeholder: "値を入力",
      }
    );
  };

  const config = getFieldConfig(customItem);

  return (
    <>
      <Header title="ルームの作成" href="/rooms/new" />
      <Content>
        <Box>
          <div>{config.label}を入力してください</div>
          {config.description && (
            <div className="mt-4 text-sm">
              <p> {config.description}</p>
              <p> {config.description2}</p>
            </div>
          )}
        </Box>
        <CustomForm
          action={upsertDefaultCustomRoom}
          label={config.label}
          name={customItem}
          type={config.type}
          maxLength={config.maxLength}
          placeholder={config.placeholder}
          isNewRoom={true}
        />
      </Content>
    </>
  );
};

export default CustomRoomSettingPage;
