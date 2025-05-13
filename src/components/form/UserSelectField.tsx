"use client";

import Image from "next/image";
import UserSelectDialog from "../nav/UserSelectDialog";
import { useSelectedUsers } from "@/src/hooks/useSelectedUsers";
import type { UserData } from "@/src/lib/models/users/type";

interface UserSelectFieldProps {
  users: UserData[];
  className?: string;
}

const UserSelectField = ({ users, className = "" }: UserSelectFieldProps) => {
  const { selectedUsers, toggleUser, isSelected } = useSelectedUsers(users);

  return (
    <div>
      <div className="flex justify-between">
        <label className={`flex text-blue-800 font-bold `}>ユーザー</label>
        <UserSelectDialog
          users={users}
          selectedUsers={selectedUsers}
          toggleUser={toggleUser}
          isSelected={isSelected}
        />
      </div>
      <div className={`center gap-6 mt-2 ${className}`}>
        {selectedUsers.map((user) => (
          <div key={user.name}>
            <input type="hidden" name="userIds" value={user.id} />
            <Image src={user.icon} alt="user-icon" width={50} height={50} />
            <div className="text-sm text-blue-800 font-bold mt-2">
              {user.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSelectField;
