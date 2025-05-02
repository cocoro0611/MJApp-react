interface HeaderCenterProps {
  title: string;
}

const HeaderCenter = ({ title }: HeaderCenterProps) => {
  const getDisplayTitle = () => {
    const titleMapping: { [key: string]: string } = {
      room: "ルーム",
      roomCreate: "ルーム作成",
      roomDetail: "ルーム詳細",
      roomEdit: "ルーム編集",
      user: "ユーザー",
      userCreate: "ユーザー作成",
      userDetail: "ユーザー詳細",
      userEdit: "ユーザー編集",
      fuCount: "符数計算",
      hanCount: "翻数計算",
    };
    return titleMapping[title] || title;
  };

  return <>{getDisplayTitle()}</>;
};

export default HeaderCenter;
