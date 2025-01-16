import clsx from "clsx";

type Severity = "warning" | "error" | "info" | "success";

type Props = {
  severity: Severity;
  title?: string;
  children: string;
  className?: string;
};

const Alert = ({ severity, title, children, className }: Props) => {
  return (
    <div
      className={clsx(
        {
          "bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3": severity === "success",
          "bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3": severity === "info",
          "bg-amber-100 border-t border-b border-amber-500 text-amber-700 px-4 py-3": severity === "warning",
          "bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3": severity === "error",
        },
        className,
      )}
      role="alert"
    >
      {title && <p className="font-bold">{title}</p>}
      <p className="text-sm">{children}</p>
    </div>
  );
};

export default Alert;
