import Link from "next/link";

interface ButtonFixedProps {
  href: string;
}

const ButtonFixed = ({ href }: ButtonFixedProps) => {
  return (
    <Link href={href} className="fixed-btn">
      +
    </Link>
  );
};

export default ButtonFixed;
