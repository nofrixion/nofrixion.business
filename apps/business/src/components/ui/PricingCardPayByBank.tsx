import { formatAmount } from '../../lib/formatters'

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
    <div className="sm:p-6 md:p-8 lg:p-10 p-4 2xl:w-[649px] md:w-[521.47px]">
      <div className="mb-4">
        <span className="text-[#00264D] text-xl leading-10 font-semibold">
          Pay by bank cost per fulfilled transaction
        </span>
      </div>

      {payByBankPricing && payByBankPricing.length > 0 && (
        <div className="flex flex-col">
          {payByBankPricing.map((item, index) => (
            <div
              key={index}
              className="flex flex-row border-b border-[#D5DBDD] text-[#00264D] font-normal text-base py-1"
            >
              <div className="leading-10 w-6/12">{item.limit} </div>
              <div className="leading-9 text-xs text-[#143252] align-middle w-3/12">
                {item.feeCondition}{' '}
              </div>
              <div className="leading-9 font-semibold text-right w-3/12">
                €{formatAmount(item.amount)}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-right mt-2">
        <span className="text-[#73808C] leading-6 text-xs font-normal">
          For GBP payments the same fee schedule applies in GBP.
        </span>
      </div>
    </div>
  )
}

export default PricingCardPayByBank
