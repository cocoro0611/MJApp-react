"use client";

import { useState } from "react";
import Image from "next/image";
import UserCard from "@/src/template/Users/UserCard";

interface IconSelectProps {
  defaultValue?: string;
}

const iconData = [
  "/users-icon/monster01.png",
  "/users-icon/monster02.png",
  "/users-icon/monster03.png",
  "/users-icon/monster04.png",
  "/users-icon/monster05.png",
  "/users-icon/monster06.png",
  "/users-icon/monster07.png",
  "/users-icon/monster08.png",
  "/users-icon/monster09.png",
  "/users-icon/monster10.png",
  "/users-icon/monster11.png",
  "/users-icon/monster12.png",
  "/users-icon/animal_arupaka.png",
  "/users-icon/animal_buta.png",
  "/users-icon/animal_hamster.png",
  "/users-icon/animal_hiyoko.png",
  "/users-icon/animal_inu.png",
  "/users-icon/animal_kuma.png",
  "/users-icon/animal_mitsubachi.png",
  "/users-icon/animal_neko.png",
  "/users-icon/animal_panda.png",
  "/users-icon/animal_penguin.png",
  "/users-icon/animal_usagi.png",
  "/users-icon/animal_zou.png",
];

const IconSelect = ({ defaultValue = "" }: IconSelectProps) => {
  const initialIcon = iconData.includes(defaultValue)
    ? defaultValue
    : iconData[0];

  const [selectedIcon, setSelectedIcon] = useState(initialIcon);

  return (
    <div>
      <label className="flex text-blue-800 font-bold">アイコン</label>
      <input type="hidden" name="icon" value={selectedIcon} />
      <div className="center py-4">
        <UserCard name="名前" icon={selectedIcon} size="lg" />
      </div>
      <div className="grid-6">
        {iconData.map((icon) => (
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

export default IconSelect;
