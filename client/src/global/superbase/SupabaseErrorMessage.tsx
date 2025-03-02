import SupabaseError from "./SupabaseError";
import cls from "@/shared/lib/classnames";
import { Alert } from "@/shared/ui";

type Props = {
  error?: SupabaseError | null;
  className?: string;
};

const SupabaseErrorMessage = ({ error, className }: Props) => {
  if (!error) return null;

  return (
    <div className={cls(className)}>
      <Alert severity="error">{error.message}</Alert>
    </div>
  );
};

export default SupabaseErrorMessage;
