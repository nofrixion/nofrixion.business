import * as React from "react";
import { parseBoldText } from "../utils/uiFormaters";
import { cn } from "@nofrixion/utils";
import { Icon } from "../atoms";

interface EditOptionCardProps {
  label: string;
  values?: string[];
  details?: string[];
  onClick?: () => void;
  children?: React.ReactNode;
  isLoading: boolean;
}

export const EditOptionCard: React.FC<EditOptionCardProps> = ({
  label,
  values,
  details,
  onClick,
  children,
  isLoading,
}) => {
  const handleOnClick = () => {
    if (!isLoading) {
      onClick && onClick();
    }
  };
  return (
    <button
      className={cn(
        "bg-mainGrey group rounded-lg p-4 w-full flex flex-col text-sm/6 transition ease-in-out text-left",
        {
          "hover:bg-greyBg": !isLoading,
          "cursor-default": isLoading,
        },
      )}
      onClick={handleOnClick}
    >
      <div className="flex flex-col md:flex-row w-full">
        <span className="text-greyText mb-3.5 md:mb-0">{label}</span>

        <div className="hidden md:block">
          <Icon
            name="edit/16"
            className={cn("ml-2 transition opacity-0 mt-1", {
              "group-hover:opacity-100": !isLoading,
            })}
          />
        </div>

        {isLoading && (
          <div className="animate-pulse my-auto ml-auto flex justify-center items-center">
            <div className="h-3 w-40 bg-[#E0E9EB] rounded-lg"></div>
          </div>
        )}
        {!isLoading && (
          <div className="flex-col grid md:justify-items-end md:ml-auto transition truncate">
            {values &&
              values.map((value, index) => {
                return (
                  <span className="truncate" key={`value-${index}`}>
                    {value}
                  </span>
                );
              })}
            {children}
          </div>
        )}
      </div>
      {!isLoading && details && details.length > 0 && (
        <div className="flex flex-col mt-2 text-greyText text-xs md:ml-auto">
          {details?.map((detail, index) => {
            return <span key={`detail-${index}`}>{parseBoldText(detail)}</span>;
          })}
        </div>
      )}
    </button>
  );
};
