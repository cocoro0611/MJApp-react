import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import ButtonGroup from "../ui/ButtonGroup";

const tabs = [
  { id: "/rooms", label: "ルーム", icon: <HomeIcon /> },
  { id: "/users", label: "ユーザー", icon: <PersonIcon /> },
  { id: "/fu-count", label: "符数計算", icon: <CalculateOutlinedIcon /> },
  { id: "/han-count", label: "翻数計算", icon: <CalculateOutlinedIcon /> },
];

const Footer = () => {
  return (
    <nav className="nav-container center">
      <div className="container-width center">
        <ButtonGroup
          tabs={tabs}
          className="center py-2 flex-1 flex-col md:flex-row md:space-x-2"
        />
      </div>
    </nav>
  );
};

export default Footer;
