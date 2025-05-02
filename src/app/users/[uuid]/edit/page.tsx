import Form from "next/form";
import Button from "@/src/components/ui/Button";
import InputField from "@/src/components/form/InputField";
import IconSelect from "@/src/components/form/IconSelect";
import Dialog from "@/src/components/layout/Dialog";
import { readUser } from "@/src/lib/models/users/read";
import { updateUser } from "@/src/lib/models/users/update";
import { deleteUser } from "@/src/lib/models/users/delete";

const UserEditPage = async ({ params }: { params: { uuid: string } }) => {
  const uuid = params.uuid;
  const user = await readUser(uuid);

  return (
    <>
      <Form action={updateUser} className="center flex-col space-y-8">
        <input type="hidden" name="id" value={user?.id} />
        <InputField
          label="名前"
          name="name"
          type="text"
          maxLength={4}
          placeholder="名前を入力（４文字以内）"
          defaultValue={user?.name}
          className="w-[19.4rem] md:w-[39.2rem]"
        />
        <IconSelect defaultValue={user?.icon} />
        <Button className="w-[19.4rem] md:w-[39.2rem]">更新</Button>
      </Form>
      {/* FIXME:削除ボタン（仮） */}
      <Form action={deleteUser} className="center my-10">
        <input type="hidden" name="id" value={user?.id} />
        <Button color="danger" className="w-[19.4rem] md:w-[39.2rem]">
          削除
        </Button>
        <Dialog></Dialog>
      </Form>
    </>
  );
};

export default UserEditPage;
