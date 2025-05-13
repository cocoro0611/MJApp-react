"use client";

import Button from "@/src/components/ui/Button";
import UserCard from "../Users/UserCard";
import useUserSelect from "@/src/hooks/useUserSelect";
import type { UserData } from "@/src/lib/models/users/type";

interface SelectRoomUsersProps {
  users: UserData[];
}

const SelectRoomUsers = ({ users }: SelectRoomUsersProps) => {
  const {
    selectedUserIds,
    toggleUser,
    isUserSelected,
    isSelectionComplete,
    selectionCount,
    maxSelection,
  } = useUserSelect(users, 4);

  return (
    <div className="form-width">
      <label className="center text-blue-800 font-bold">
        ４人選択してください ({selectionCount}/{maxSelection})
      </label>

      {selectedUserIds.map((userId) => (
        <input key={userId} type="hidden" name="userIds" value={userId} />
      ))}

      <div className="center my-8">
        <div className="grid-4">
          {users.map((user) => (
            <div key={user.id} onClick={() => toggleUser(user.id)}>
              <UserCard
                name={user.name}
                icon={user.icon}
                size="sm"
                isColor={isUserSelected(user.id) ? "secondary" : ""}
              />
            </div>
          ))}
        </div>
      </div>
      <Button disabled={!isSelectionComplete()} className="form-width">
        選択
      </Button>
    </div>
  );
};

export default SelectRoomUsers;
