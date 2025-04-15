import Form from "next/form";
import { createUser } from "@/src/lib/models/users/create";

export default function CreateUser() {
  return (
    <Form action={createUser}>
      <label>名前</label>
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </Form>
  );
}
