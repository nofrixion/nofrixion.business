import * as React from "react";

interface ChipProps {
  label: string;
}

export const Chip: React.FC<ChipProps> = ({ label }) => {
  return (
    <span className="text-[#1B2232] bg-greyBg px-3 py-1 rounded-full text-xs whitespace-nowrap inline-block align-middle">
      {label}
    </span>
  );
};
