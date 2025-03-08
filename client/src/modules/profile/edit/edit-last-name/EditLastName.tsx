import { Input } from "@/shared/ui";
import { useFormContext } from "@/shared/lib/form";

const EditLastName = () => {
  const form = useFormContext();

  return form.renderField("lastName", ({ getFieldProps }) => <Input label="Last name" disabled={form.isSubmitting} {...getFieldProps()} />);
};

export default EditLastName;
