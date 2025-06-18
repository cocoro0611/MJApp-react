"use client";

import Button from "@/src/components/ui/Button";
import UserCard from "../../../template/Users/UserCard";
import useUserSelect from "@/src/hooks/useUserSelect";
import type { ReadUserData } from "@/src/lib/models/users/type";
import { MAX_ROOM_PLAYERS } from "@/src/constants/gameRules";

interface SelectRoomUsersProps {
  users: ReadUserData[];
}

const SelectRoomUsers = ({ users }: SelectRoomUsersProps) => {
  const { selectedUsers, toggleUser, isUserSelected, isReady } =
    useUserSelect(users);

  return (
    <div className="form-width">
      <label className="center text-blue-800 font-bold">
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
                className={
                  isUserSelected(user.id)
                    ? "secondary card-border"
                    : "not-select-border"
                }
              />
            </div>
          ))}
        </div>
      </div>
      <Button disabled={!isReady()} className="form-width">
        選択
      </Button>
    </div>
  );
};

export default SelectRoomUsers;
