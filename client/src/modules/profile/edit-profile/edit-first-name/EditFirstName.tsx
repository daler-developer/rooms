import { Input } from "@/shared/ui";
import { useFormContext } from "@/shared/lib/form";

const EditFirstName = () => {
  const form = useFormContext();

  return form.renderField("firstName", ({ getFieldProps }) => (
    <div>
      <Input label="First name" disabled={form.isSubmitting} {...getFieldProps()} />
    </div>
  ));
};

export default EditFirstName;
