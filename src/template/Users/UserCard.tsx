import Image from "next/image";
import Card from "@/src/components/ui/Card";

interface UserCardProps {
  href?: string;
  name: string;
  icon: string;
  isColor?: boolean;
  size?: "mdWf" | "md" | "lg";
  className?: string;
}

const cardSizeClassName = {
  md: {
    card: "h-16 w-16",
    image: { width: 30, height: 30 },
    text: "text-sm mt-1",
  },
  mdWf: {
    card: "h-16 w-full",
    image: { width: 30, height: 30 },
    text: "text-sm mt-1",
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
  size = "md",
  className = "",
}: UserCardProps) => {
  const cardSize = cardSizeClassName[size];

  return (
    <Card
      href={href}
      isColor={isColor}
      className={`center flex-col ${cardSize.card} ${className}`}
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
