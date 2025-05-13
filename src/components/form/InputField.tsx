interface InputFieldProps {
  label: string;
  name: string;
  type: "text" | "number" | "hidden";
  maxLength: number;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

const InputField = ({
  label,
  name,
  type,
  maxLength,
  placeholder = "",
  defaultValue = "",
  className = "form-width",
}: InputFieldProps) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="flex text-blue-800 font-bold">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="input-border p-2 w-full"
      />
    </div>
  );
};

export default InputField;
