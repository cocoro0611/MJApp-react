import Form from "next/form";
import { createUser } from "@/src/lib/models/users/create";
import { TextField } from "@mui/material";
import Button from "@/src/components/ui/Button";

const UserNewPage = () => {
  return (
    <Form action={createUser}>
      <TextField label="名前" type="text" name="name" variant="outlined" />

      <label>アイコン</label>
      <input type="text" name="icon" />
      <Button>作成</Button>
    </Form>
  );
};

export default UserNewPage;
