import { useFormContext } from "@/shared/lib/form";
import { Input } from "@/shared/ui";
import { ChangeEvent, useRef, useState } from "react";
import useDebouncedFn from "../../../../shared/hooks/useDebouncedFn.ts";
import { useCustomLazyQuery } from "@/shared/lib/graphql";
import { CHECK_EMAIL_AVAILABILITY_FOR_REGISTER } from "@/modules/auth/register/gql/tags.ts";

const RegisterFormEmailInput = () => {
  const form = useFormContext();

  const [showIsChecking, setShowIsChecking] = useState(false);
  const [showEmailIsAvailable, setShowEmailIsAvailable] = useState(false);
  const [showEmailIsNotAvailable, setShowEmailIsNotAvailable] = useState(false);

  const queries = {
    checkEmailAvailability: useCustomLazyQuery(CHECK_EMAIL_AVAILABILITY_FOR_REGISTER, {
      fetchPolicy: "no-cache",
    }),
  };

  const callId = useRef(0);

  const handleEmailChangeDebouncedAction = useDebouncedFn(async (e: ChangeEvent<HTMLInputElement>) => {
    const currentCallId = ++callId.current;
    setShowIsChecking(true);
    const value = e.target.value;

    await queries.checkEmailAvailability.fetch({
      variables: {
        email: value,
      },
      onCompleted(data) {
        if (currentCallId !== callId.current) {
          return;
        }
        const isAvailable = data.checkEmailAvailability;

        setShowIsChecking(false);

        if (isAvailable) {
          setShowEmailIsNotAvailable(false);
          setShowEmailIsAvailable(true);
        } else {
          setShowEmailIsAvailable(false);
          setShowEmailIsNotAvailable(true);
        }
      },
      onError() {
        if (currentCallId !== callId.current) {
          return;
        }
        setShowIsChecking(false);
      },
    });
  }, 1000);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>, { isValid }) => {
    setShowEmailIsAvailable(false);
    setShowEmailIsNotAvailable(false);
    setShowIsChecking(false);
    if (isValid) {
      handleEmailChangeDebouncedAction(e);
    }
  };

  return (
    <div>
      {form.renderField("email", ({ getFieldProps, errors }) => (
        <div>
          <Input
            label="Email"
            {...getFieldProps({
              onChange: handleEmailChange,
            })}
            errors={errors}
          />
        </div>
      ))}
      <div className="h-[20px] pl-[4px]">
        {showIsChecking && <div className="text-[12px] font-medium text-gray-600">Checking...</div>}
        {showEmailIsAvailable && <div className="text-[12px] font-medium text-green-600">Available</div>}
        {showEmailIsNotAvailable && <div className="text-[12px] font-medium text-red-600">Not available</div>}
      </div>
    </div>
  );
};

export default RegisterFormEmailInput;
