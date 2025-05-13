import Link from "next/link";

interface ButtonFixedProps {
  href: string;
  disabled?: boolean;
}

const ButtonFixed = ({ href, disabled = false }: ButtonFixedProps) => {
  if (disabled) {
    return (
      <span className="fixed-btn primary cursor-not-allowed opacity-50">+</span>
    );
  }

  return (
    <Link href={href} className="fixed-btn primary scale-effect">
      +
    </Link>
  );
};

export default ButtonFixed;
