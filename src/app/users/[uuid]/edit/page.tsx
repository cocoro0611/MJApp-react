import Form from "next/form";
import { readUser } from "@/src/lib/models/users/read";
import { updateUser } from "@/src/lib/models/users/update";
import { deleteUser } from "@/src/lib/models/users/delete";

const UserEditPage = async ({
  params: { uuid },
}: {
  params: { uuid: string };
}) => {
  const user = await readUser(uuid);

  return (
    <div>
      <Form action={updateUser}>
        <input type="hidden" name="id" value={user?.id} />
        <input type="text" name="name" defaultValue={user?.name} />
        <label>アイコン</label>
        <input type="text" name="icon" defaultValue={user?.icon} />
        <button type="submit" className="primary rounded-lg p-4">
          更新
        </button>
      </Form>
      <Form action={deleteUser}>
        <input type="hidden" name="id" value={user?.id} />
        <button type="submit" className="primary rounded-lg p-4">
          削除
        </button>
      </Form>
    </div>
  );
};

export default UserEditPage;
