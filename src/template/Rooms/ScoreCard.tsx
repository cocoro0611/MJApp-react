import UserCard from "../Users/UserCard";

interface ScoreCardProps {
  name: string;
  icon: string;
  score?: number;
  chip?: number;
  total?: number;
}

const ScoreCard = () => {
  return (
    <div className="grid-fixed-4">
      <div>
        <UserCard name="aaa" icon=""></UserCard>
      </div>
      <div>いい</div>
      <div>うう</div>
      <div>ええ</div>
    </div>
  );
};

export default ScoreCard;
