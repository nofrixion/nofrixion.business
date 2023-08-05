import * as React from "react";
// import searchIconDisabled from "../../../assets/icons/search-icon-disabled.svg";
// import searchIconEnabled from "../../../assets/icons/search-icon-enabled.svg";
// import closeIcon from "../../../assets/images/nf_close.svg";
import { cn } from "@nofrixion/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "../atoms";

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  setValue: (value: string) => void;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ maxLength = 100, value, setValue, ...props }, ref) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };

    const onClear = () => {
      setValue("");
    };

    return (
      <div className="relative inline-flex">
        <input
          ref={ref}
          type="text"
          maxLength={maxLength}
          className={cn(
            "inline outline outline-1 hover:outline-borderGrey focus:outline-borderGrey " +
              "focus:rounded-lg focus:w-48 py-2 pl-9 pr-1 text-sm placeholder:text-greyText " +
              "placeholder:opacity-100 text-default-text bg-[12px] bg-no-repeat transition-all",
            {
              "outline-borderGrey rounded-lg w-48 pr-9": value,
              "rounded w-24": !value,
            },
          )}
          style={{
            // TODO: Add icons back not using CSS, but SVGs with divs
            // backgroundImage: value || isFocused ? `url(${searchIconEnabled})` : `url(${searchIconDisabled})`,
            outlineColor: "transparent",
          }}
          placeholder="Search"
          onChange={onChange}
          value={value}
          {...props}
        />
        <AnimatePresence>
          {value && (
            <motion.button
              className="outline-none cursor-pointer p-0 m-0 absolute right-4 top-[calc(50%-0.25rem)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClear}
            >
              <Icon name="close/12" className="w-2 h-2" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

SearchBar.displayName = "SearchBar";
