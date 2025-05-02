import Link from "next/link";

interface ButtonFixedProps {
  href: string;
}

const ButtonFixed = ({ href }: ButtonFixedProps) => {
  return (
    <Link href={href} className="fixed-btn primary">
      +
    </Link>
  );
};

export default ButtonFixed;
