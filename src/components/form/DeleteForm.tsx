import Form from "next/form";
import DeleteDialog from "@/src/components/nav/DeleteDialog";

interface DeleteFormProps {
  action: (formData: FormData) => void;
  name: string;
  value: string;
}

const DeleteForm = ({ action, name, value }: DeleteFormProps) => {
  return (
    <Form action={action}>
      <input type="hidden" name={name} value={value} />
      <DeleteDialog />
    </Form>
  );
};

export default DeleteForm;
