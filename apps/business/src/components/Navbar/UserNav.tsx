import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useLocation, useNavigate } from 'react-router-dom'

import IconDoubleArrows from '../../assets/icons/double-arrow.svg'
import IconLogout from '../../assets/icons/logout.svg'
import PricingIcon from '../../assets/icons/pricing.svg'
import IconSort from '../../assets/icons/sort.svg'
import UsersIcon from '../../assets/icons/users.svg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../../components/ui/DropDown'
import { AuthContextType } from '../../lib/auth/AuthProvider'
import { useAuth } from '../../lib/auth/useAuth'
import { getAvatarName } from '../../lib/formatters'
import useMerchantsStore from '../../lib/stores/useMerchantsStore'
import useMerchantStore from '../../lib/stores/useMerchantStore'
import useStore from '../../lib/stores/useStore'
import useUserStore from '../../lib/stores/useUserStore'

const merchantImage = (shortName: string) =>
  `https://cdn.nofrixion.com/nextgen/assets/merchants/${shortName}/${shortName}.svg`

const UserNav = () => {
  const currentRoute = useLocation().pathname
  const navigate = useNavigate()
  const { authState } = useAuth() as AuthContextType

  const { merchant, setMerchant } = useStore(useMerchantStore, (state) => state) ?? {
    merchant: undefined,
  }

  const merchants = useStore(useMerchantsStore, (state) => state.merchants)
  const user = useStore(useUserStore, (state) => state.user)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="!ml-auto !mr-8 md:!mr-14 relative my-auto text-white flex"
          aria-label="User settings"
        >
          {/* Merchant image */}
          <div className="hidden md:flex h-10 w-10 rounded-full bg-white justify-center items-center">
            <Avatar>
              <AvatarImage
                className="h-10 w-10"
                src={merchantImage(merchant?.shortName ?? '')}
                alt={`${merchant?.shortName} logo`}
              />
              <AvatarFallback className="text-black">
                {getAvatarName(merchant?.name || '')}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Merchant name */}
          <div className="ml-4 flex flex-col items-start mr-2 md:mr-11">
            <p className="font-semibold">{merchant?.name ?? 'Merchant unknown'}</p>
            <p className="text-nav-accent text-xs">
              {user?.firstName} {user?.lastName}
            </p>
          </div>

          <img src={IconSort} className="my-auto" alt="Chevron Icon" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent sideOffset={30} align="end">
          {merchants && merchants.length > 1 && (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger
                icon={{
                  src: IconDoubleArrows,
                  alt: 'Switch merchants',
                }}
              >
                Switch merchant
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent sideOffset={40}>
                  {merchants
                    .filter((m) => m.id !== merchant?.id)
                    ?.map((merchant) => (
                      <DropdownMenuItem
                        onSelect={() => {
                          setMerchant && setMerchant(merchant)
                        }}
                        key={merchant.id}
                      >
                        {merchant.name}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          )}
          <DropdownMenuItem
            onSelect={() => navigate('users')}
            disabled={currentRoute.indexOf('/home/users') !== -1}
            icon={{
              src: UsersIcon,
              alt: 'Users',
            }}
          >
            Users
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => navigate('pricing')}
            disabled={currentRoute.indexOf('/home/pricing') !== -1}
            icon={{
              src: PricingIcon,
              alt: 'Pricing',
            }}
          >
            Pricing
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              authState?.logOut && authState?.logOut(currentRoute)
            }}
            icon={{
              src: IconLogout,
              alt: 'Log out',
            }}
          >
            Log out
          </DropdownMenuItem>
          {import.meta.env.version && (
            <DropdownMenuItem className="text-[10px] mt-4 text-[#A6C8D9] p-0" disabled>
              Version {import.meta.env.version}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}

export default UserNav
