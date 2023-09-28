import { Link } from 'react-router-dom'

export interface NavItemProps {
  leftIcon: any
  label: string
  href: string
  isActive?: boolean
}

const NavItem: React.FC<NavItemProps> = ({ leftIcon, label, href, isActive = false }) => {
  return (
    <Link
      to={href}
      className="relative text-xs px-4 pt-2 pb-2 flex items-center 2xl:text-sm 2xl:px-6"
    >
      <div className="w-4 h-4">
        <img src={leftIcon} alt={`${label} icon`} />
      </div>

      <span className="ml-3">{label}</span>

      {isActive && <div className="h-1 bg-nav-accent w-full absolute left-0 bottom-0"></div>}
    </Link>
  )
}

export default NavItem
