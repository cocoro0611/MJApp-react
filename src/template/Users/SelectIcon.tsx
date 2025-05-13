"use client";

import { useState } from "react";
import Image from "next/image";
import UserCard from "@/src/template/Users/UserCard";
import { ICON_LIST } from "@/src/constants/iconList";

interface SelectIconProps {
  defaultValue?: string;
}

const SelectIcon = ({ defaultValue = "" }: SelectIconProps) => {
  const initialIcon = ICON_LIST.includes(defaultValue)
    ? defaultValue
    : ICON_LIST[0];

  const [selectedIcon, setSelectedIcon] = useState(initialIcon);

  return (
    <div className="form-width">
      <label className={`flex text-blue-800 font-bold `}>アイコン</label>
      <input type="hidden" name="icon" value={selectedIcon} />
      <div className="center py-4">
        <UserCard name="名前" icon={selectedIcon} size="lg" />
      </div>
      <div className="grid-6">
        {ICON_LIST.map((icon) => (
          <Image
            key={icon}
            src={icon}
            alt={icon}
            onClick={() => setSelectedIcon(icon)}
            className={
              selectedIcon === icon
                ? "secondary revolution-effect icon-border"
                : "rounded-full"
            }
            width={45}
            height={45}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectIcon;
