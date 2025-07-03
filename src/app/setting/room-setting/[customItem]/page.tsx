import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import CustomForm from "@/src/template/rooms/CustomForm";
import { upsertDefaultRoomCustom } from "@/src/lib/models/setting";

interface CustomSettingPageProps {
  params: Promise<{ customItem: string }>;
}

const CustomSettingPage = async ({ params }: CustomSettingPageProps) => {
  const { customItem } = await params;

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
        description: "1000点あたりのポイントを入力してください",
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
      <Header title="カスタム設定" href="/setting/room-setting" />
      <Content>
        <div className="bg-secondary-100 border border-secondary-500 text-secondary-800 rounded p-2 font-bold text-sm mb-8">
          <p>{config.label}を入力してください。</p>
          {config.description && (
            <div>
              <p> {config.description}</p>
              <p> {config.description2}</p>
            </div>
          )}
        </div>
        <CustomForm
          action={upsertDefaultRoomCustom}
          label={config.label}
          name={customItem}
          type={config.type}
          maxLength={config.maxLength}
          placeholder={config.placeholder}
        />
      </Content>
    </>
  );
};

export default CustomSettingPage;
