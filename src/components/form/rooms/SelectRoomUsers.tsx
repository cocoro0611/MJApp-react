"use client";

import Button from "@/src/components/ui/Button";
import { UserCard } from "@/src/template/Users";
import useUserSelect from "@/src/hooks/user-data/useUserSelect";
import type { ReadUser } from "@/src/lib/models/users/type";
import { MAX_ROOM_PLAYERS } from "@/src/constants/gameRules";

interface SelectRoomUsersProps {
  users: ReadUser[];
}

const SelectRoomUsers = ({ users }: SelectRoomUsersProps) => {
  const { selectedUsers, toggleUser, isUserSelected, isReady } =
    useUserSelect(users);

  return (
    <div className="w-full">
      <label className="center text-primary-800 font-bold">
        {MAX_ROOM_PLAYERS}人選択してください ({selectedUsers.length}/
        {MAX_ROOM_PLAYERS})
      </label>

      {selectedUsers.map((userId) => (
        <input key={userId} type="hidden" name="userIds" value={userId} />
      ))}

      <div className="center my-8">
        <div className="grid-4">
          {users.map((user) => (
            <div key={user.id} onClick={() => toggleUser(user.id)}>
              <UserCard
                name={user.name}
                icon={user.icon}
                isColor={isUserSelected(user.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <Button
        disabled={!isReady()}
        custom={true}
        className="w-full rounded px-4 py-2"
      >
        選択
      </Button>
    </div>
  );
};

export default SelectRoomUsers;
