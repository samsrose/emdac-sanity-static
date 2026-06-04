import React from "react";

interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>, "size"> {
  error?: { message?: string };
  label?: React.ReactNode;
  inputRef?: React.Ref<HTMLInputElement & HTMLTextAreaElement>;
  size?: "sm" | "md" | "lg";
}

function TextField(props: TextFieldProps) {
  const {
    error,
    type = "text",
    size = "md",
    label,
    className,
    inputRef,
    ...inputProps
  } = props;

  const classes = {
    base: "block border placeholder-gray-400 z-10 w-full rounded active:z-10 focus:z-10 -mr-px border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50",
    size: {
      sm: "py-2 leading-5",
      md: "px-4 py-3 leading-6",
      lg: "",
    },
  };

  return (
    <div className={"w-full" + (className ? ` ${className}` : "")}>
      {label && (
        <label className="block mb-1 font-medium" htmlFor={props.id}>
          {label}
        </label>
      )}

      {type === "textarea" && (
        <textarea
          className={`${classes.base} ${classes.size[size]}`}
          ref={inputRef}
          {...inputProps}
        />
      )}

      {type !== "textarea" && (
        <input
          className={`${classes.base} ${classes.size[size]}`}
          ref={inputRef}
          type={type}
          {...inputProps}
        />
      )}

      {error && (
        <p className="text-sm text-left text-red-600 mt-1">{error.message}</p>
      )}
    </div>
  );
}

export default TextField;
