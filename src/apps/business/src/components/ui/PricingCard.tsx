import formatText from '@/lib/utils/formatText'
import IconListCheck from '../../assets/icons/list-check.svg'
import Button from '@/components/ui/Button'
import { useState } from 'react'
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
    <div className="biz-flex biz-flex-col biz-items-center biz-py-10 biz-px-6 biz-shrink-0 biz-w-80 biz-h-[650px] biz-rounded-lg biz-bg-white biz-mb-16">
      <div className="biz-flex biz-flex-col biz-items-center biz-h-full">
        <h6 className="biz-font-bold biz-tracking-[0.75px] biz-uppercase biz-mb-4">{title}</h6>
        <div className="biz-mb-6">
          <span className="biz-text-[#05C7C6] biz-text-[40px] biz-font-semibold biz-mr-1">
            € {price}
          </span>

          <span className="biz-text-gray-text ">/month</span>
        </div>

        <div className="biz-mb-6 biz-text-center">
          <div className="biz-text-[#00264D] biz-text-[13px] biz-font-normal biz-leading-[15.73px] biz-h-[32px]">
            {extraTitle}
          </div>
        </div>

        <div className="biz-mb-8 biz-w-full biz-flex">
          {!isInterested ? (
            <Button className="biz-mx-auto biz-py-3 biz-px-[24px]" onClick={onInterested}>
              {'Contact me about this pack'}
            </Button>
          ) : (
            <InfoBox
              className="biz-w-full biz-py-2"
              title="Thanks!"
              message="Our sales team will contact you soon."
            />
          )}
        </div>

        <div className="biz-mb-8 biz-h-[1px] biz-w-[120px] biz-bg-[#D5DBDD]">
          <hr />
        </div>

        {extraText && <p className="biz-mb-4 biz-text-sm/6 biz-mr-auto">{formatText(extraText)}</p>}

        {items && items.length > 0 && (
          <ul
            className="biz-pl-5 biz-text-sm/6"
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
