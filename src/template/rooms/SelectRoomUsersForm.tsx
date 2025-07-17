"use client";

import Form from "next/form";
import Box from "@/src/components/ui/Box";
import ToastButton from "@/src/components/nav/ToastButton";
import UserCard from "../users/UserCard";
import { useUserSelect } from "@/src/hooks/user-data/useUserSelect";
import { useServerActionToast } from "@/src/hooks/ui/useServerActionToast";
import { MAX_ROOM_PLAYERS } from "@/src/constants/gameRules";
import type { ReadUser } from "@/src/lib/models/users/type";
import type { ServerAction } from "@/src/hooks/ui/useServerActionToast";

interface SelectRoomUsersFormProps {
  action: ServerAction;
  users: ReadUser[];
  isNewRoom?: boolean;
}

const SelectRoomUsersForm = ({
  action,
  users,
  isNewRoom = false,
}: SelectRoomUsersFormProps) => {
  const { selectedUsers, toggleUser, isUserSelected, isReady } =
    useUserSelect(users);
  const { isPending, toastMessage, toastColor, redirect, handleSubmit } =
    useServerActionToast(action);

  return (
    <Form action={handleSubmit} className="center flex-col space-y-6">
      {isNewRoom && <input type="hidden" name="isNewRoom" value="true" />}
      <Box>
        {MAX_ROOM_PLAYERS}人選択してください ({selectedUsers.length}/
        {MAX_ROOM_PLAYERS})
      </Box>
      {selectedUsers.map((userId) => (
        <input key={userId} type="hidden" name="userIds" value={userId} />
      ))}

      <div className="grid-4 gap-4">
        {users.map((user) => (
          <div key={user.id} onClick={() => toggleUser(user.id)}>
            <UserCard
              name={user.name}
              icon={user.icon}
              leftBorder="sm"
              className={`
                ${isUserSelected(user.id) ? "" : "opacity-20"}
                h-16 w-16 text-[0.7rem]`}
            />
          </div>
        ))}
      </div>
      <ToastButton
        disabled={!isReady()}
        toastMessage={toastMessage}
        toastColor={toastColor}
        redirect={redirect}
      >
        {isPending ? "選択中..." : "選択"}
      </ToastButton>
    </Form>
  );
};

export default SelectRoomUsersForm;
