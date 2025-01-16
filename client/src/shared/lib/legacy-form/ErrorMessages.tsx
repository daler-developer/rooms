type Props = {
  errors: string[];
};

const ErrorMessages = ({ errors }: Props) => {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-1">
      {errors.map((error, index) => (
        <div key={index} className="text-red-900">
          {error}
        </div>
      ))}
    </div>
  );
};

export default ErrorMessages;
