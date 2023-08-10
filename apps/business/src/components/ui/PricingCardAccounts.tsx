export interface PricingAccountsProps {
  accountPricing: PricingAccounts[]
}

export interface PricingAccounts {
  limit: string
  feeCondition?: string
  amount?: number
}

const PricingCardAccounts: React.FC<PricingAccountsProps> = ({ accountPricing }) => {
  return (
    <div className="sm:p-6 md:p-8 lg:p-10 p-4 2xl:w-[649px] md:w-[521.47px]">
      <div className="mb-4">
        <span className="text-[#00264D] text-xl leading-10 font-semibold">Accounts</span>
      </div>

      {accountPricing && accountPricing.length > 0 && (
        <div className="flex flex-col">
          {accountPricing.map((item, index) => (
            <div
              key={index}
              className="flex flex-row border-b border-[#D5DBDD] text-[#00264D] font-normal text-base leading-10 py-1"
            >
              <div className="w-5/12 leading-10">{item.limit} </div>
              <div className="text-xs text-[#143252]  w-5/12 px-1 leading-10">
                {item.feeCondition && item.amount && <span>{item.feeCondition}</span>}
              </div>
              <div className="font-semibold text-right w-2/12 leading-10">
                {item.amount ? (
                  <span>
                    €{item.amount}
                    <span className="font-normal">/year</span>
                  </span>
                ) : (
                  <span className="text-[#29A37A]">{item.feeCondition}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PricingCardAccounts
