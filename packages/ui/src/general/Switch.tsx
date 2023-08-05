import * as React from "react";
import { Switch as SwitchHeadless } from "@headlessui/react";
import { cn } from "@nofrixion/utils";
import { Icon, IconNames } from "../atoms";

interface SwitchProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  iconName: IconNames;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({ label, value, iconName, className, onChange }: SwitchProps) => {
  return (
    <div className={cn("flex w-full select-none items-center", className)}>
      <SwitchHeadless.Group>
        <SwitchHeadless.Label className="cursor-pointer flex items-center flex-1">
          <Icon name={iconName} className="w-6 h-6 mr-4 inline-block" />
          <span className="align-middle pr-2">{label}</span>
        </SwitchHeadless.Label>
        <SwitchHeadless
          checked={value}
          onChange={onChange}
          className={`${
            value ? "bg-primaryGreen" : "bg-borderGrey"
          } relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-200 ease-in-out`}
        >
          <span
            className={`${
              value ? "translate-x-[1.375rem]" : "translate-x-[0.125rem]"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </SwitchHeadless>
      </SwitchHeadless.Group>
    </div>
  );
};
