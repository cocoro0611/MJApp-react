"use client";

import Button from "../ui/Button";
import { useState } from "react";

type optionsType = {
  value: number | string;
  label: string;
};

interface SelectFieldProps {
  label: string;
  name: string;
  options: optionsType[];
  defaultValue: number | string;
  isCustomBtn?: boolean;
  href?: string;
}

const SelectField = ({
  label,
  name,
  options,
  defaultValue,
  isCustomBtn = false,
  href = "",
}: SelectFieldProps) => {
  const [selectedValue, setSelectedValue] = useState<number | string>(
    defaultValue
  );

  return (
    <div className="w-full">
      <div className="flex justify-between text-primary-800 font-bold">
        <input id={name} name={name} type="hidden" value={selectedValue} />
        <label htmlFor={name}>{label}</label>
        {isCustomBtn && (
          <Button
            href={href}
            color="secondary"
            className="px-2 py-1 rounded text-xs"
          >
            カスタム
          </Button>
        )}
      </div>
      <div className="center gap-2 mt-2 text-sm">
        <div className="grid-2">
          {options.map((option) => (
            <Button
              key={option.value}
              color={
                selectedValue === option.value
                  ? "toggle-active"
                  : "toggle-inactive"
              }
              className="p-1 rounded-2xl w-30"
              onClick={() => setSelectedValue(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectField;
