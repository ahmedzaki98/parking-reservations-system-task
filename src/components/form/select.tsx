import { Option } from "@/types";
import Select from "react-select";

type Props = {
  field: {
    name: string;
    value: Option | null;
    onChange: (value: Option | null) => void;
    onBlur?: () => void;
  };
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: Option | null) => void;
};
export const SelectInput: React.FC<Props> = ({
  field,
  options,
  disabled,
  placeholder,
  onChange,
}: Props) => {
  return (
    <>
      <Select
        {...field}
        options={options}
        placeholder={placeholder}
        isClearable
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: "#1e1e1e",
            borderColor: state.isFocused ? "var(--color-primary)" : "#333",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            color: "#fff",
            height: 36,
            boxShadow: state.isFocused ? "0 0 0 1px #777" : "none",
            "&:hover": {
              borderColor: "var(--color-primary)",
            },
          }),
          singleValue: (base) => ({
            ...base,
            color: "#fff",
          }),
          input: (base) => ({
            ...base,
            color: "#fff",
          }),
          placeholder: (base) => ({
            ...base,
            color: "#aaa",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "#1e1e1e",
            border: "1px solid #333",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "var(--color-primary)"
              : state.isFocused
              ? "#333"
              : "#1e1e1e",
            color: "#fff",
            cursor: "pointer",
            ":active": {
              backgroundColor: "#444",
            },
          }),
          dropdownIndicator: (base) => ({
            ...base,
            color: "var(--color-primary)",
            "&:hover": {
              color: "#fff",
            },
          }),
          clearIndicator: (base) => ({
            ...base,
            color: "var(--color-primary)",
            "&:hover": {
              color: "#fff",
            },
          }),
          indicatorSeparator: (base) => ({
            ...base,
            backgroundColor: "#444",
          }),
        }}
        onChange={onChange}
        isDisabled={disabled}
      />
    </>
  );
};

SelectInput.displayName = "SelectInput";
