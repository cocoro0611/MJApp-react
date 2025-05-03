import Link from "next/link";

interface ButtonFixedProps {
  href: string;
}

const ButtonFixed = ({ href }: ButtonFixedProps) => {
  return (
    <Link href={href} className="fixed-btn scale-effect primary">
      +
    </Link>
  );
};

export default ButtonFixed;
