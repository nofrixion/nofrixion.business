import { useState } from 'react'

import IconListCheck from '../../assets/icons/list-check.svg'
import Button from '../../components/ui/Button'
import formatText from '../../lib/utils/formatText'
import InfoBox from './InfoBox'

export interface PricingCardProps {
  title: string
  extraTitle?: string
  price: number
  items?: string[]
  extraText?: string
  onInterestedClick?: () => void
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  items,
  extraText,
  extraTitle,
  onInterestedClick,
}) => {
  const [isInterested, setIsInterested] = useState(false)

  const onInterested = () => {
    setIsInterested(true)
    onInterestedClick && onInterestedClick()
  }

  return (
    <div className="flex flex-col items-center py-10 px-6 shrink-0 w-80 h-[650px] rounded-lg bg-white mb-16">
      <div className="flex flex-col items-center h-full">
        <h6 className="font-bold tracking-[0.75px] uppercase mb-4">{title}</h6>
        <div className="mb-6">
          <span className="text-[#05C7C6] text-[40px] font-semibold mr-1">€ {price}</span>

          <span className="text-gray-text ">/month</span>
        </div>

        <div className="mb-6 text-center">
          <div className="text-[#00264D] text-[13px] font-normal leading-[15.73px] h-[32px]">
            {extraTitle}
          </div>
        </div>

        <div className="mb-8 w-full flex">
          {!isInterested ? (
            <Button className="mx-auto py-3 px-[24px]" onClick={onInterested}>
              {'Contact me about this pack'}
            </Button>
          ) : (
            <InfoBox
              className="w-full py-2"
              title="Thanks!"
              message="Our sales team will contact you soon."
            />
          )}
        </div>

        <div className="mb-8 h-[1px] w-[120px] bg-[#D5DBDD]">
          <hr />
        </div>

        {extraText && <p className="mb-4 text-sm/6 mr-auto">{formatText(extraText)}</p>}

        {items && items.length > 0 && (
          <ul
            className="pl-5 text-sm/6"
            style={{
              listStyleImage: `url('${IconListCheck}')`,
            }}
          >
            {items.map((item, index) => (
              <li key={index}>{formatText(item)}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default PricingCard
