import IconAccountsPayable from '../assets/icons/accounts-payable.svg'
import IconAccountsReceivable from '../assets/icons/accounts-receivable.svg'
import IconCurrentAccounts from '../assets/icons/current-accounts.svg'
import IconDashboard from '../assets/icons/dashboard.svg'
import IconPayouts from '../assets/icons/payouts.svg'
import { getRoute } from './utils/utils'

const NOFRIXION_API_URL = '/api'
const NOFRIXION_BFF_URL = '/bff'

const NOFRIXION_BUSINESS_GITHUB_URL = 'https://github.com/nofrixion/nofrixion.business/pull/'

interface INavItem {
  leftIcon: any
  label: string
  href: string
  isActive?: boolean
  isHidden?: boolean
  isHome?: boolean
}

const navItems: INavItem[] = [
  {
    leftIcon: IconDashboard,
    label: 'Dashboard',
    href: getRoute('/home'),
    isHome: true,
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
]

export { navItems, NOFRIXION_API_URL, NOFRIXION_BFF_URL, NOFRIXION_BUSINESS_GITHUB_URL }
