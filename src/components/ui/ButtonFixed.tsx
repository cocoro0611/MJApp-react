import Link from "next/link";
import Button from "./Button";

interface ButtonFixedProps {
  href: string;
  disabled?: boolean;
}

const ButtonFixed = ({ href, disabled = false }: ButtonFixedProps) => {
  return (
    <Link href={href}>
      <Button
        custom={true}
        className="px-5 py-3 text-3xl rounded-xl hover:scale-105
        fixed bottom-[10vh] z-10 
        right-[4vh] md:right-[8vh] lg:right-[12vh] xl:right-[16vh] "
        disabled={disabled}
      >
        +
      </Button>
    </Link>
  );
};

export default ButtonFixed;
