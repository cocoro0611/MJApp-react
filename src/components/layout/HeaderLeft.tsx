import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";

interface HeaderLeftProps {
  title: string;
}

const HeaderLeft = ({ title }: HeaderLeftProps) => {
  return (
    <Link href="">
      <ArrowBackIosIcon />
    </Link>
  );
};

export default HeaderLeft;
