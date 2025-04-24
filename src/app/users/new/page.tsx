import Form from "next/form";
import { createUser } from "@/src/lib/models/users/create";

const UserNewPage = () => {
  return (
    <Form action={createUser}>
      <label>名前</label>
      <input type="text" name="name" />
      <label>アイコン</label>
      <input type="text" name="icon" />
      <button type="submit" className="test-btn">
        作成
      </button>
    </Form>
  );
};

export default UserNewPage;
