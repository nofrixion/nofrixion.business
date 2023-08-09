import IconAccountsPayable from '../assets/icons/accounts-payable.svg'
import IconAccountsReceivable from '../assets/icons/accounts-receivable.svg'
import IconCurrentAccounts from '../assets/icons/current-accounts.svg'
import IconDashboard from '../assets/icons/dashboard.svg'
import IconPayouts from '../assets/icons/payouts.svg'
import IconPricing from '../assets/icons/pricing.svg'
import IconUsers from '../assets/icons/users.svg'

const NOFRIXION_API_URL = import.meta.env.VITE_PUBLIC_NOFRIXION_API_URL
const NOFRIXION_BFF_URL = import.meta.env.VITE_PUBLIC_BFF_URL

interface INavItem {
  leftIcon: any
  label: string
  href: string
  isActive?: boolean
  isHidden?: boolean
}

const navItems: INavItem[] = [
  {
    leftIcon: IconDashboard,
    label: 'Dashboard',
    href: '/home',
  },
  {
    leftIcon: IconCurrentAccounts,
    label: 'Current Accounts',
    href: '/home/current-accounts',
  },
  {
    leftIcon: IconAccountsReceivable,
    label: 'Accounts Receivable',
    href: '/home/accounts-receivable',
  },
  {
    leftIcon: IconAccountsPayable,
    label: 'Accounts Payable (soon)',
    href: '/home/accounts-payable',
  },
  {
    leftIcon: IconPayouts,
    label: 'Payouts',
    href: '/home/payouts',
  },
  {
    leftIcon: IconUsers,
    label: 'Users',
    href: '/home/users',
    isHidden: true,
  },
  {
    leftIcon: IconPricing,
    label: 'Pricing',
    href: '/home/pricing',
    isHidden: true,
  },
]

export { navItems,NOFRIXION_API_URL, NOFRIXION_BFF_URL }
