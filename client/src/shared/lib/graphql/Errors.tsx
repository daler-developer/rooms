import { Alert } from "@/shared/ui";
import { ApolloError } from "@apollo/client";
import cls from "@/shared/lib/classnames";

type Props = {
  error?: ApolloError;
  className?: string;
};

const Errors = ({ error, className }: Props) => {
  if (!error || error.graphQLErrors.length === 0) {
    return null;
  }

  return (
    <div className={cls("flex flex-col gap-1", className)}>
      {error.graphQLErrors.map((graphQLError, i) => (
        <Alert key={i} severity="error">
          {graphQLError.message}
        </Alert>
      ))}
    </div>
  );
};

export default Errors;
