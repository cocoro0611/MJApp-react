"use client";

import Button from "@/src/components/ui/Button";
import Form from "next/form";
import { UserCard } from "@/src/template/Users";
import useUserSelect from "@/src/hooks/user-data/useUserSelect";
import type { ReadUser } from "@/src/lib/models/users/type";
import { MAX_ROOM_PLAYERS } from "@/src/constants/gameRules";

interface SelectRoomUsersFormProps {
  action: (formData: FormData) => void;
  users: ReadUser[];
}

const SelectRoomUsersForm = ({ action, users }: SelectRoomUsersFormProps) => {
  const { selectedUsers, toggleUser, isUserSelected, isReady } =
    useUserSelect(users);

  return (
    <Form action={action} className="center flex-col space-y-6">
      <label className=" text-primary-800 font-bold">
        {MAX_ROOM_PLAYERS}人選択してください ({selectedUsers.length}/
        {MAX_ROOM_PLAYERS})
      </label>

      {selectedUsers.map((userId) => (
        <input key={userId} type="hidden" name="userIds" value={userId} />
      ))}

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
      <Button type="submit" disabled={!isReady()}>
        選択
      </Button>
    </Form>
  );
};

export default SelectRoomUsersForm;
