"use client";

import { usePathname } from "next/navigation";
import HeaderLeft from "./HeaderLeft";
import HeaderCenter from "./HeaderCenter";
import HeaderRight from "./HeaderRight";

const Header = () => {
  const pathname = usePathname();

  const getTitle = () => {
    const patterns = [
      { regex: /^\/rooms$/, title: "room" },
      { regex: /^\/rooms\/new$/, title: "roomCreate" },
      { regex: /^\/rooms\/[^/]+$/, title: "roomDetail" },
      { regex: /^\/rooms\/[^/]+\/edit$/, title: "roomEdit" },
      { regex: /^\/users$/, title: "user" },
      { regex: /^\/users\/new$/, title: "userCreate" },
      { regex: /^\/users\/[^/]+$/, title: "userDetail" },
      { regex: /^\/users\/[^/]+\/edit$/, title: "userEdit" },
      { regex: /^\/fu-count$/, title: "fuCount" },
      { regex: /^\/han-count$/, title: "hanCount" },
    ];

    const match = patterns.find((p) => p.regex.test(pathname));
    return match ? match.title : "";
  };

  const title = getTitle();

  return (
    <header className="header-container center">
      <div className="container-width center">
        <div className="w-1/12 py-2">
          <HeaderLeft title={title} />
        </div>
        <div className="w-5/6 py-2">
          <HeaderCenter title={title} />
        </div>
        <div className="w-1/12 py-2">
          <HeaderRight title={title} />
        </div>
      </div>
    </header>
  );
};

export default Header;
