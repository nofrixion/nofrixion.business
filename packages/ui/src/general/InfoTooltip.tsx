import * as React from "react";
const { useState } = React;
import * as Tooltip from "@radix-ui/react-tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@nofrixion/utils";
import { Icon } from "../atoms";

interface InfoTooltipProps {
  content: string;
  children?: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ content, children, side = "top", className }) => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger className={cn("w-4 h-4 min-w-[1rem] min-h-[1rem] inline-flex", className)}>
          <>
            {/* If no children show img */}
            {!children && <Icon name="info/16" className="cursor-pointer w-4 h-4" />}

            {children}
          </>
        </Tooltip.Trigger>
        <AnimatePresence>
          {open && (
            <Tooltip.Portal forceMount>
              <Tooltip.Content sideOffset={5} side={side} asChild>
                <motion.div
                  className="rounded-lg p-4 bg-white select-none max-w-xs shadow-[0px_0px_16px_rgba(4,_41,_49,_0.15)] text-sm z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {content}
                </motion.div>
              </Tooltip.Content>
            </Tooltip.Portal>
          )}
        </AnimatePresence>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default InfoTooltip;
