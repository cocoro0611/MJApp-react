"use client";

import Image from "next/image";
import { UserCard } from "@/src/template/Users";
import { useState } from "react";
import { USER_LIST } from "@/src/constants/iconList";

interface SelectIconProps {
  name: string;
  value: string;
}

const SelectIcon = ({ name, value }: SelectIconProps) => {
  const iconList = USER_LIST.map((user) => user.icon);
  const initialIcon = iconList.includes(value) ? value : iconList[0];

  const [selectedIcon, setSelectedIcon] = useState(initialIcon);

  return (
    <div className="w-full">
      <label className={`flex text-blue-800 font-bold `}>アイコン</label>
      <input type="hidden" name="icon" value={selectedIcon} />
      <div className="center py-4">
        <UserCard name={name} icon={selectedIcon} size="lg" />
      </div>
      <div className="grid-6">
        {iconList.map((icon) => (
          <Image
            key={icon}
            src={icon}
            alt={icon}
            onClick={() => setSelectedIcon(icon)}
            className={`rounded-full revolution-effect
              ${selectedIcon === icon ? "secondary" : "white"}`}
            width={45}
            height={45}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectIcon;
