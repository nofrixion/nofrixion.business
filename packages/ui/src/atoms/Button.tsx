import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@nofrixion/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const buttonVariants = cva(
  "rounded-full inline-flex items-center justify-center whitespace-nowrap align-middle cursor-pointer transition w-full disabled:opacity-20 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: ["bg-positive-action", "text-white", "hover:bg-positive-action-hover"],
        primaryDark: ["bg-[#006A80]", "text-white", "hover:bg-[#144752]"],
        secondary: ["bg-secondary-button", "text-default-text", "hover:bg-secondary-button-hover"],
        tertiary: ["border", "border-border-gray", "hover:border-border-gray-highlighted", "text-default-text"],
        text: ["text-gray-text", "hover:text-gray-text-hover"],
      },
      size: {
        big: ["text-base", "px-3", "py-3", "md:px-6", "font-normal", "leading-6"],
        medium: ["text-sm", "px-4", "py-2", "font-normal", "leading-6"],
        small: ["text-[0.813rem]", "py-1", "px-3", "font-normal", "leading-6"],
        "x-small": ["text-[0.813rem]", "py-1", "px-3", "font-normal", "leading-4"],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "big",
    },
  },
);

export const Button: React.FC<ButtonProps> = ({ variant, size, className, ...props }) => {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
};
