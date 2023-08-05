import { formatAmount } from '@/lib/formatters'

export interface PricingPayByBankProps {
  payByBankPricing: PricingPayByBank[]
}

export interface PricingPayByBank {
  limit: string
  feeCondition: string
  amount: number
}

const PricingCardPayByBank: React.FC<PricingPayByBankProps> = ({ payByBankPricing }) => {
  return (
    <div className="sm:biz-p-6 md:biz-p-8 lg:biz-p-10 biz-p-4 2xl:biz-w-[649px] md:biz-w-[521.47px]">
      <div className="biz-mb-4">
        <span className="biz-text-[#00264D] biz-text-xl biz-leading-10 biz-font-semibold">
          Pay by bank cost per fulfilled transaction
        </span>
      </div>

      {payByBankPricing && payByBankPricing.length > 0 && (
        <div className="biz-flex biz-flex-col">
          {payByBankPricing.map((item, index) => (
            <div
              key={index}
              className="biz-flex biz-flex-row biz-border-b biz-border-[#D5DBDD] biz-text-[#00264D] biz-font-normal biz-text-base biz-py-1"
            >
              <div className="biz-leading-10 biz-w-6/12">{item.limit} </div>
              <div className="biz-leading-9 biz-text-xs biz-text-[#143252] biz-align-middle biz-w-3/12">
                {item.feeCondition}{' '}
              </div>
              <div className="biz-leading-9 biz-font-semibold biz-text-right biz-w-3/12">
                €{formatAmount(item.amount)}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="biz-text-right biz-mt-2">
        <span className="biz-text-[#73808C] biz-leading-6 biz-text-xs biz-font-normal">
          For GBP payments the same fee schedule applies in GBP.
        </span>
      </div>
    </div>
  )
}

export default PricingCardPayByBank
