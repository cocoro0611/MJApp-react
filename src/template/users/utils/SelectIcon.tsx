"use client";

import Image from "next/image";
import UserCard from "../UserCard";
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
      <label className="flex text-primary-800 font-bold">アイコン</label>
      <input type="hidden" name="icon" value={selectedIcon} />
      <div className="center pb-8">
        <UserCard
          name={name}
          icon={selectedIcon}
          leftBorder="lg"
          imageSize={100}
          className="text-lg h-40 w-40"
        />
      </div>
      <div className="grid-6 gap-3">
        {iconList.map((icon) => (
          <Image
            key={icon}
            src={icon}
            alt={icon}
            onClick={() => setSelectedIcon(icon)}
            className={`rounded-full effect-rotate
              ${selectedIcon === icon ? "border-2 border-primary-300 bg-primary-100" : ""}`}
            width={43}
            height={43}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectIcon;
