import Button from "./Button";

interface ButtonFixedProps {
  href?: string;
  color?:
    | "primary"
    | "secondary"
    | "danger"
    | "cancel"
    | "white"
    | "toggle-active"
    | "toggle-inactive";
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonFixed = ({
  href,
  color = "primary",
  disabled = false,
  onClick,
}: ButtonFixedProps) => {
  return (
    <Button
      href={href}
      color={color}
      disabled={disabled}
      onClick={onClick}
      className="px-5 py-3 text-3xl rounded-xl fixed z-10 bottom-[6rem] 
      right-[2rem] md:right-[8rem] lg:right-[5rem]"
    >
      +
    </Button>
  );
};

export default ButtonFixed;
