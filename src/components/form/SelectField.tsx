interface SelectFieldProps {
  label: string;
  name: string;
  defaultValue?: string;
  className?: string;
}

const SelectField = ({
  label,
  name,
  defaultValue = "",
  className = "",
}: SelectFieldProps) => {
  return (
    <div>
      <label htmlFor={name} className="flex text-blue-800 font-bold">
        {label}
      </label>
      <input id={name} name={name} type="hidden" defaultValue={defaultValue} />
      <button type="button" className="setting-btn-on">
        25000
      </button>
      <button type="button" className="setting-btn-off">
        25000
      </button>
    </div>
  );
};

export default SelectField;
