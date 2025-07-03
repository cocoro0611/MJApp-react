import Image from "next/image";
import Card from "@/src/components/ui/Card";

interface UserCardProps {
  href?: string;
  name: string;
  icon: string;
  isColor?: boolean;
  border?: "sm" | "md" | "lg" | "none";
  size?: "mdWf" | "md" | "lg";
  className?: string;
}

interface CardSizeConfig {
  card: string;
  image: { width: number; height: number };
  text: string;
}

const cardSizeClassName: Record<string, CardSizeConfig> = {
  md: {
    card: "h-16 w-16",
    image: { width: 30, height: 30 },
    text: "text-xs mt-1",
  },
  mdWf: {
    card: "h-16 w-full",
    image: { width: 30, height: 30 },
    text: "text-xs mt-1",
  },
  lg: {
    card: "h-40 w-40",
    image: { width: 100, height: 100 },
    text: "text-lg mt-2",
  },
};

const UserCard = ({
  href = "",
  name,
  icon,
  isColor = true,
  border = "md",
  size = "md",
  className = "",
}: UserCardProps) => {
  const cardSize = cardSizeClassName[size];

  return (
    <Card
      href={href}
      isColor={isColor}
      border={border}
      className={`center flex-col center ${cardSize.card} ${className}`}
    >
      <Image
        src={icon}
        alt="user-icon"
        width={cardSize.image.width}
        height={cardSize.image.height}
      />
      <span className={cardSize.text}>{name}</span>
    </Card>
  );
};

export default UserCard;
