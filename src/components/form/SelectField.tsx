"use client";

import Button from "../ui/Button";
import { useState, useMemo } from "react";

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

  const generateCustomLabel = (
    value: number | string,
    fieldName: string
  ): string => {
    const stringValue = String(value);

    switch (fieldName) {
      case "initialPoint":
      case "returnPoint":
        return `${stringValue}点`; // 35000 → "35000点"
      case "chipRate":
        return `${stringValue}P`; // 150 → "150P"
      case "scoreRate":
        return `${stringValue}P`; // 75P → "75P"
      case "bonusPoint":
        return stringValue; // "15-25" → "15-25"
      default:
        return stringValue; // その他はそのまま
    }
  };

  const displayOptions = useMemo(() => {
    const existsInOptions = options.some(
      (option) => option.value === selectedValue
    );

    if (existsInOptions) {
      return options;
    } else {
      const customOption: optionsType = {
        value: selectedValue,
        label: generateCustomLabel(selectedValue, name),
      };
      return [...options, customOption];
    }
  }, [options, selectedValue, name]);

  return (
    <div className="w-full">
      <div className="flex justify-between text-primary-800 font-bold">
        <input id={name} name={name} type="hidden" value={selectedValue} />
        <label htmlFor={name}>{label}</label>
        {isCustomBtn && (
          <Button
            href={href}
            color="primary-light"
            className="px-2 py-1 rounded text-xs"
          >
            カスタム
          </Button>
        )}
      </div>
      <div className="center mt-2 text-sm">
        <div className="grid-2 gap-2">
          {displayOptions.map((option) => (
            <Button
              key={option.value}
              color={
                selectedValue === option.value ? "toggle-on" : "toggle-off"
              }
              className="p-1 rounded-2xl w-30"
              onClick={() => setSelectedValue(option.value)}
            >
              <p>{option.label}</p>
              {name === "scoreRate" &&
                !options.some((opt) => opt.value === option.value) && (
                  <p className="text-[0.6rem]">(1000点あたり)</p>
                )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectField;
