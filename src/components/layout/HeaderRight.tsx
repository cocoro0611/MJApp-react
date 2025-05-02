import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Link from "next/link";

interface HeaderRightProps {
  title: string;
}

const HeaderRight = ({ title }: HeaderRightProps) => {
  return (
    <Link href="">
      <DeleteOutlineIcon />
    </Link>
  );
};

export default HeaderRight;
