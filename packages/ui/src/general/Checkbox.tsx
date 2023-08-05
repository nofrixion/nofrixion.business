import * as React from "react";
const { useId } = React;
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Icon } from "../atoms";
import InfoTooltip from "./InfoTooltip";

interface CheckboxProps {
  label: string;
  description?: string;
  infoText?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, description, value, infoText, onChange }) => {
  const id = useId();

  return (
    <div className="flex md:items-center select-none cursor-pointer text-sm w-fit">
      <RadixCheckbox.Root
        className="bg-white outline outline-1 outline-borderGrey border-borderGrey rounded-sm min-w-[1rem] min-h-[1rem] w-4 h-4"
        id={id}
        checked={value}
        onCheckedChange={onChange}
      >
        <RadixCheckbox.Indicator className="w-full h-full block">
          <Icon name="check/16" className="w-3 h-full m-auto" />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>

      <label className="cursor-pointer pl-3 pr-2 mb-0 -mt-0.5 md:mt-0" htmlFor={id}>
        {label}

        {description && <div className="mt-1 text-greyText font-normal text-xs">{description}</div>}
      </label>

      {infoText && <InfoTooltip content={infoText} />}
    </div>
  );
};

export default Checkbox;
