import { Input } from "@/shared/ui";
import { useFormContext } from "@/shared/lib/form";

const EditLastName = () => {
  const form = useFormContext();

  return form.renderField("lastName", ({ getFieldProps }) => (
    <div>
      <Input label="Last name" disabled={form.isSubmitting} {...getFieldProps()} />
    </div>
  ));
};

export default EditLastName;
