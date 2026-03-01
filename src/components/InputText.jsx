import { Label, TextInput } from "flowbite-react";

function InputText({
  containerClassName,
  label,
  labelProps = {},
  required,
  ...props
}) {
  const labProps = {
    ...labelProps,
    className: [required ? "required" : "", labelProps.className || ""]
      .filter(Boolean)
      .join(" "),
  };

  return (
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
      <Label {...labProps}>{label}</Label>
      <TextInput {...props} />
    </div>
  );
}

export default InputText;
