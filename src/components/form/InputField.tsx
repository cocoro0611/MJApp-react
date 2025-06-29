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
    const inputValue = e.target.value;

    if (type === "number") {
      if (inputValue.length > maxLength) {
        return;
      }

      const numValue = inputValue === "" ? 0 : Number(inputValue);

      if (inputValue !== "" && isNaN(numValue)) {
        return;
      }

      onChange(numValue as T);
    } else {
      onChange(inputValue as T);
    }
  };

  const displayValue = () => {
    if (type === "number") {
      // 数値が0の場合は空文字で表示
      return value === 0 ? "" : String(value);
    }
    return String(value);
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
        value={displayValue()}
        onChange={handleChange}
        className="border-2 border-primary-500 rounded p-2 w-full          
        focus:ring-4 focus:ring-primary-100"
      />
    </div>
  );
};

export default InputField;
