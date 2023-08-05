import * as React from "react";
import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import { cn } from "@nofrixion/utils";

interface ScrollAreaProps {
  children: React.ReactNode;
  hideScrollbar?: boolean;
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({ children, hideScrollbar = false }) => {
  return (
    <RadixScrollArea.Root>
      <RadixScrollArea.Viewport>{children}</RadixScrollArea.Viewport>
      <RadixScrollArea.Scrollbar
        className={cn("flex select-none overflow-hidden touch-none", {
          "rounded-b-md bg-gray-100 transition-colors duration-[160ms] ease-out hover:bg-gray-200 flex-col h-2":
            !hideScrollbar,
        })}
        orientation="horizontal"
      >
        <RadixScrollArea.Thumb className="flex-1 bg-gray-300" />
      </RadixScrollArea.Scrollbar>
    </RadixScrollArea.Root>
  );
};
