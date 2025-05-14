import Image from "next/image";
import Card from "@/src/components/ui/Card";

interface UserCardProps {
  href?: string;
  name: string;
  icon: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const cardSizeClassName = {
  sm: {
    card: "h-16 w-16",
    image: { width: 30, height: 30 },
    text: "text-sm mt-1",
  },
  md: {
    card: "h-20 w-20",
    image: { width: 50, height: 50 },
    text: "text-sm",
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
  size = "md",
  className = "secondary card-border",
}: UserCardProps) => {
  const cardSize = cardSizeClassName[size];

  return (
    <Card
      href={href}
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
