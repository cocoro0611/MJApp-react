interface InputFieldProps<T extends string | number> {
  label: string;
  name: string;
  type: "text" | "number" | "hidden";
  maxLength: number;
  placeholder?: string;
  value: T;
  onChange?: (value: T) => void;
}

const InputField = <T extends string | number>({
  label,
  name,
  type,
  maxLength,
  placeholder = "",
  value,
  onChange,
}: InputFieldProps<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;

    if (type === "number") {
      const numValue = e.target.value === "" ? 0 : Number(e.target.value);
      onChange(numValue as T);
    } else {
      onChange(e.target.value as T);
    }
  };

  return (
    <div className="w-full">
      <label htmlFor={name} className="flex text-primary-800 font-bold">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="border-2 border-primary-500 rounded p-2 w-full          
        focus:ring-4 focus:ring-primary-100"
      />
    </div>
  );
};

export default InputField;
