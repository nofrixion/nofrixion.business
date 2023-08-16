import IconAccountsPayable from '../assets/icons/accounts-payable.svg'
import IconAccountsReceivable from '../assets/icons/accounts-receivable.svg'
import IconCurrentAccounts from '../assets/icons/current-accounts.svg'
import IconDashboard from '../assets/icons/dashboard.svg'
import IconPayouts from '../assets/icons/payouts.svg'
import IconPricing from '../assets/icons/pricing.svg'
import IconUsers from '../assets/icons/users.svg'
import { getRoute } from './utils/utils'

const NOFRIXION_API_URL = '/api'
const NOFRIXION_BFF_URL = '/bff'

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
    href: getRoute('/home'),
  },
  {
    leftIcon: IconCurrentAccounts,
    label: 'Current Accounts',
    href: 'current-accounts',
  },
  {
    leftIcon: IconAccountsReceivable,
    label: 'Accounts Receivable',
    href: 'accounts-receivable',
  },
  {
    leftIcon: IconAccountsPayable,
    label: 'Accounts Payable (soon)',
    href: 'accounts-payable',
  },
  {
    leftIcon: IconPayouts,
    label: 'Payouts',
    href: 'payouts',
  },
  {
    leftIcon: IconUsers,
    label: 'Users',
    href: 'users',
    isHidden: true,
  },
  {
    leftIcon: IconPricing,
    label: 'Pricing',
    href: 'pricing',
    isHidden: true,
  },
]

export { navItems, NOFRIXION_API_URL, NOFRIXION_BFF_URL }
