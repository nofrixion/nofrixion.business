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
    <nav className="flex text-white bg-dark-bg h-20 pl-8 md:pl-14 w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className={cn(
              'relative text-xs leading-10 pt-2 pb-2 flex items-center 2xl:text-sm cursor-pointer',
            )}
          >
            <img src={IconNoFrixion} alt={`NoFrixion icon`} />

            <img src={IconSort} className="ml-2 md:ml-4 my-auto" alt="Navigation icon" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent sideOffset={10} align="center" className="mx-6">
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
