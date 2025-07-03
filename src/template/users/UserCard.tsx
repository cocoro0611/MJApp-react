import Image from "next/image";
import Card from "@/src/components/ui/Card";

interface UserCardProps {
  href?: string;
  color?:
    | "primary"
    | "primary-light"
    | "secondary"
    | "danger"
    | "cancel"
    | "white"
    | "toggle-on"
    | "toggle-off"
    | "toggle-disabled";
  leftBorder?: "sm" | "md" | "lg" | "none";
  // カード情報
  name: string;
  icon: string;
  imageSize?: number;
  className?: string;
}

const UserCard = ({
  href = "",
  color = "primary-light",
  leftBorder = "none",
  // カード情報
  name,
  icon,
  imageSize = 30,
  className = "",
}: UserCardProps) => {
  return (
    <Card
      href={href}
      color={color}
      leftBorder={leftBorder}
      className={`center flex-col ${className}`}
    >
      <Image src={icon} alt="user-icon" width={imageSize} height={imageSize} />
      <span className="mt-1">{name}</span>
    </Card>
  );
};

export default UserCard;
