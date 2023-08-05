import { Link } from 'react-router-dom'

interface UnderConstructionUIProps {
  title: string
  link: string
}

const UnderConstructionUI: React.FC<UnderConstructionUIProps> = ({ title, link }) => {
  return (
    <>
      <h1 className="biz-text-[1.75rem]/8 biz-font-medium">{title}</h1>

      <div className="biz-mt-14 biz-leading-8 biz-flex biz-flex-col lg:biz-flex-row">
        <div className="biz-flex-col biz-mb-8 biz-mr-auto">
          <span className="biz-flex biz-mb-[10px] biz-text-[#00264D] biz-text-base">
            This section is still under construction.
          </span>
          <span className="biz-mb-[10px] biz-text-[#00264D] biz-text-base">
            You can still access your {title.toLocaleLowerCase()} on the developer portal at{' '}
            <Link to={link} target="_blank" className="biz-underline hover:biz-no-underline">
              {link.replace('https://', '')}
            </Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default UnderConstructionUI
