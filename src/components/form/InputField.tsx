interface InputFieldProps {
  label: string;
  name: string;
  type: "text" | "number" | "hidden";
  maxLength: number;
  placeholder?: string;
  value: string;
  onChange?: (value: string) => void;
}

const InputField = ({
  label,
  name,
  type,
  maxLength,
  placeholder = "",
  value,
  onChange,
}: InputFieldProps) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="flex text-blue-800 font-bold">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="border border-blue-500 rounded p-2 w-full"
      />
    </div>
  );
};

export default InputField;
