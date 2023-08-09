import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import * as React from 'react'

import { cn } from '../../lib/utils/utils'

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const itemClassname =
  'biz-text-sm/8 biz-flex biz-select-none biz-outline-none data-[highlighted]:biz-text-nav-accent focus:biz-text-nav-accent biz-cursor-pointer biz-py-2 data-[disabled]:biz-opacity-50 data-[disabled]:biz-cursor-not-allowed'

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    icon?: {
      src: string
      alt: string
    }
  }
>(({ className, icon, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger ref={ref} className={cn(itemClassname, className)} {...props}>
    {icon && (
      <div className="biz-mr-3 biz-my-auto">
        <img src={icon.src} alt={icon.alt} />
      </div>
    )}
    {children}
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn('biz-bg-dark-bg biz-rounded-lg biz-py-4 biz-px-6 biz-text-white', className)}
    {...props}
  />
))
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'biz-min-w-[140px] biz-bg-dark-bg biz-rounded-lg biz-py-4 biz-pl-8 biz-pr-10 biz-text-white',
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    icon?: {
      src: string
      alt: string
    }
  }
>(({ className, icon, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Item ref={ref} className={cn(itemClassname, className)} {...props}>
    <>
      {icon && (
        <div className="biz-mr-3 biz-my-auto">
          <img src={icon.src} alt={icon.alt} />
        </div>
      )}

      {children}
    </>
  </DropdownMenuPrimitive.Item>
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

export {
  DropdownMenu,
  DropdownMenuContent,
  //   DropdownMenuCheckboxItem,
  //   DropdownMenuRadioItem,
  //   DropdownMenuLabel,
  //   DropdownMenuSeparator,
  //   DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
}
