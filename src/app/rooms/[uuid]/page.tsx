import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import ScoreCard from "@/src/template/Rooms/ScoreCard";

const data = {
  id: "11113",
  name: "2025年5月6日",
  users: [
    { name: "太郎", icon: "/users-icon/monster01.png", totalScore: -20 },
    { name: "二郎", icon: "/users-icon/monster02.png", totalScore: -20 },
    { name: "三郎", icon: "/users-icon/monster03.png", totalScore: 20 },
    { name: "四郎", icon: "/users-icon/monster04.png", totalScore: 20 },
  ],
};

const RoomPage = async ({ params }: { params: { uuid: string } }) => {
  const uuid = params.uuid;

  return (
    <>
      <Header title="2025/04/05" href="/rooms"></Header>
      <Main>
        <ScoreCard name={data.users}></ScoreCard>
      </Main>
    </>
  );
};

export default RoomPage;
