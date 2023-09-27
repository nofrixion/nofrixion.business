import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@nofrixion/components/src/components/ui/atoms/DropDown/DropDown'
import { useLocation, useNavigate } from 'react-router-dom'

import IconNoFrixion from '../../assets/icons/nofrixion-long.svg'
import IconSort from '../../assets/icons/sort.svg'
import UserNav from '../../components/Navbar/UserNav'
import { navItems } from '../../lib/constants'
import { cn } from '../../lib/utils/utils'
import { PRReview } from '../ui/PRReview'
import NavItem from './NavbarItem'

const Navbar = () => {
  const currentRoute = useLocation().pathname
  const navigate = useNavigate()

  const commonCss = 'data-[highlighted]:text-nav-accent focus:text-nav-accent'

  const checkIfItemIsCurrentRoute = (item: any) =>
    (currentRoute.endsWith('/home') && item.isHome) ||
    (currentRoute.indexOf(item.href) !== -1 && !item.isHome)

  return (
    <nav className="flex text-white bg-dark-bg h-20 pl-8 md:pl-14 w-full">
      <div className="hidden xl:flex">
        {navItems.map((item) => {
          return <NavItem key={item.href} isActive={checkIfItemIsCurrentRoute(item)} {...item} />
        })}
      </div>
      <div className="flex xl:hidden">
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
            <DropdownMenuContent
              sideOffset={10}
              align="center"
              className="mx-6 min-w-[140px] bg-dark-bg rounded-lg text-white"
            >
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
                      disabled={checkIfItemIsCurrentRoute(item)}
                      className={commonCss}
                    >
                      {item.label}
                    </DropdownMenuItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </div>

      {import.meta.env.VITE_NOFRIXION_PULL_REQUEST_ID && <PRReview />}

      <UserNav />
    </nav>
  )
}

export { Navbar }
