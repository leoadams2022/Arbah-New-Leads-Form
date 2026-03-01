import { Label } from "flowbite-react";
import SelectInput from "./SelectInput";

function InputSelect({
  containerClassName,
  label,
  labelProps = {},
  required,
  selectLabel,
  ...props
}) {
  return (
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
      {label && (
        <Label
          {...labelProps}
          className={[required ? "required" : "", labelProps.className || ""]
            .filter(Boolean)
            .join(" ")}
        >
          {label}
        </Label>
      )}
      <SelectInput label={selectLabel || label || ""} {...props} />
    </div>
  );
}

export default InputSelect;
