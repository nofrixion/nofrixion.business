import { Link } from 'react-router-dom'

interface UnderConstructionUIProps {
  title: string
  link: string
}

const UnderConstructionUI: React.FC<UnderConstructionUIProps> = ({ title, link }) => {
  return (
    <>
      <h1 className="text-[1.75rem]/8 font-medium">{title}</h1>

      <div className="mt-14 leading-8 flex flex-col lg:flex-row">
        <div className="flex-col mb-8 mr-auto">
          <span className="flex mb-[10px] text-[#00264D] text-base">
            This section is still under construction.
          </span>
          <span className="mb-[10px] text-[#00264D] text-base">
            You can still access your {title.toLocaleLowerCase()} on the developer portal at{' '}
            <Link to={link} target="_blank" className="underline hover:no-underline">
              {link.replace('https://', '')}
            </Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default UnderConstructionUI
