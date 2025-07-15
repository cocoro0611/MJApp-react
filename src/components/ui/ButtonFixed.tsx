import Button from "./Button";

interface ButtonFixedProps {
  href?: string;
  color?:
    | "primary"
    | "primary-light"
    | "danger"
    | "cancel"
    | "white"
    | "toggle-on"
    | "toggle-off";
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
    <>
      <div className="lg:hidden container mx-auto fixed bottom-24 z-10">
        <div className="flex justify-end pr-8">
          <Button
            href={href}
            color={color}
            disabled={disabled}
            onClick={onClick}
            className="px-5 py-3 text-3xl rounded-xl"
          >
            +
          </Button>
        </div>
      </div>
      <div className="hidden lg:block fixed bottom-24 right-0 z-10">
        <div className="flex justify-end pr-20">
          <Button
            href={href}
            color={color}
            disabled={disabled}
            onClick={onClick}
            className="px-5 py-3 text-3xl rounded-xl"
          >
            +
          </Button>
        </div>
      </div>
    </>
  );
};

export default ButtonFixed;
