import { useLocation, useNavigate } from 'react-router-dom'

import IconNoFrixion from '../../assets/icons/nofrixion-long.svg'
import IconSort from '../../assets/icons/sort.svg'
import UserNav from '../../components/Navbar/UserNav'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '../../components/ui/DropDown'
import { navItems } from '../../lib/constants'
import { cn } from '../../lib/utils/utils'

const Navbar = () => {
  const currentRoute = useLocation().pathname
  const navigate = useNavigate()

  return (
    <nav className="biz-flex biz-text-white biz-bg-dark-bg biz-h-20 biz-pl-8 md:biz-pl-14 biz-w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className={cn(
              'biz-relative biz-text-xs biz-leading-10 biz-pt-2 biz-pb-2 biz-flex biz-items-center 2xl:biz-text-sm biz-cursor-pointer',
            )}
          >
            <img src={IconNoFrixion} alt={`NoFrixion icon`} />

            <img
              src={IconSort}
              className="biz-ml-2 md:biz-ml-4 biz-my-auto"
              alt="Navigation icon"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent sideOffset={10} align="center" className="biz-mx-6">
            {navItems
              .filter((item) => !item.isHidden)
              .map((item) => {
                return (
                  <DropdownMenuItem
                    key={item.href}
                    onSelect={() => navigate(item.href)}
                    icon={{
                      src: item.leftIcon,
                      alt: `${item.label} icon`,
                    }}
                    disabled={item.href === currentRoute}
                  >
                    {item.label}
                  </DropdownMenuItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>

      <UserNav />
    </nav>
  )
}

export { Navbar }
