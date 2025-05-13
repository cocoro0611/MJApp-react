import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import Form from "next/form";
import InputField from "@/src/components/form/InputField";
import SelectIcon from "@/src/template/Users/SelectIcon";
import ToastButton from "@/src/components/nav/ToastButton";
import DeleteDialog from "@/src/components/nav/DeleteDialog";
import { readUser } from "@/src/lib/models/users/read";
import { updateUser } from "@/src/lib/models/users/update";
import { deleteUser } from "@/src/lib/models/users/delete";

const UserEditPage = async ({ params }: { params: { uuid: string } }) => {
  const uuid = params.uuid;
  const user = await readUser(uuid);

  return (
    <>
      <Header title="ユーザー編集" href="/users">
        <Form action={deleteUser}>
          <input type="hidden" name="id" value={user?.id} />
          <DeleteDialog />
        </Form>
      </Header>
      <Main>
        <Form action={updateUser} className="center flex-col space-y-8">
          <input type="hidden" name="id" value={user?.id} />
          <InputField
            label="名前"
            name="name"
            type="text"
            maxLength={4}
            placeholder="名前を入力（４文字以内）"
            defaultValue={user?.name}
          />
          <SelectIcon defaultValue={user?.icon} />
          <ToastButton alertMessage="更新しました" alertColor="success">
            更新
          </ToastButton>
        </Form>
      </Main>
    </>
  );
};

export default UserEditPage;
