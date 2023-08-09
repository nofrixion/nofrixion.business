import * as RadixScrollArea from '@radix-ui/react-scroll-area'
import { forwardRef } from 'react'

import { cn } from '../../lib/utils/utils'

type ScrollAreaProps = {
  enableCustomScrollbar?: true
}

const ScrollArea = forwardRef<
  React.ElementRef<typeof RadixScrollArea.Viewport>,
  React.ComponentPropsWithoutRef<typeof RadixScrollArea.Root> & ScrollAreaProps
>(({ children, enableCustomScrollbar, ...props }, ref) => (
  <RadixScrollArea.Root {...props}>
    <RadixScrollArea.Viewport ref={ref} className="biz-snap-x biz-snap-mandatory">
      {children}
    </RadixScrollArea.Viewport>
    <RadixScrollArea.Scrollbar
      forceMount
      // forceMount={enableCustomScrollbar}
      // biz-flex-col
      className={cn(
        'biz-flex biz-select-none biz-overflow-hidden biz-touch-none biz-rounded-lg biz-bg-gray-100 biz-transition-colors biz-duration-[160ms] biz-ease-out hover:biz-bg-gray-200 biz-flex-col biz-h-2',
        {
          'biz-hidden md:biz-flex biz-mt-4 biz-mx-auto !biz-relative biz-h-0.5 biz-w-40 biz-bg-[#E0E7EA]':
            enableCustomScrollbar,
        },
      )}
      orientation="horizontal"
    >
      <RadixScrollArea.Thumb
        className={cn('biz-flex-1 biz-rounded-lg biz-bg-gray-300', {
          'biz-bg-[#477085]': enableCustomScrollbar,
        })}
      />
    </RadixScrollArea.Scrollbar>
  </RadixScrollArea.Root>
))

ScrollArea.displayName = 'ScrollArea'

export default ScrollArea
