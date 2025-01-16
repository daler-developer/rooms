import * as yup from "yup";
import { useEffect } from "react";
import { useForm } from "@/shared/lib/form";

const validationSchema = yup.object({
  inner: yup.object({
    name: yup.string().required().min(5).max(20),
    street: yup.string().required().min(5).max(20),
    items: yup.array().of(yup.string().required().min(5).max(20)),
  }),
});

const TestForm = () => {
  const form = useForm({
    initialValues: {
      inner: {
        name: "Daler",
        street: "Test street",
        items: [],
      },
    },
    validationSchema,
    onSubmit(values) {
      console.log("values", values);
    },
  });

  useEffect(() => {}, []);

  return (
    <div className="pt-[100px] pl-[100px]">
      <form onSubmit={form.handleSubmit}>
        {form.renderField("inner.name", ({ getFieldProps, hasErrors, errors }) => (
          <div>
            <input className="border border-black" type="text" placeholder="name" {...getFieldProps()} />
            {hasErrors && (
              <ul>
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {form.renderField("inner.street", ({ getFieldProps, hasErrors, errors }) => (
          <div>
            <input className="border border-black" type="text" placeholder="street" {...getFieldProps()} />
            {hasErrors && (
              <ul>
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <div className="mt-[20px]"></div>
        <div className="flex flex-col gap-y-4">
          {form.renderArray(
            "inner.items",
            ({ index, remove }) => {
              return form.renderField(`inner.items.${index}`, (itemField) => (
                <div>
                  <input className="border border-black" type="text" placeholder="street" {...itemField.getFieldProps()} />
                  <div>
                    <button
                      className="border border-black px-2"
                      onClick={() => {
                        remove();
                      }}
                    >
                      -
                    </button>
                  </div>
                  {itemField.hasErrors && (
                    <ul>
                      {itemField.errors.map((error) => (
                        <li key={error}>{error}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ));
            },
            {
              generateKey({ value, index }) {
                return index;
              },
            },
          )}
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              form.appendArrayItem("inner.items", "");
            }}
          >
            Append
          </button>
        </div>
        <div>
          <button className="border border-black" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestForm;
