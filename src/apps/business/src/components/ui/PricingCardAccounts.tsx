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
    <div className="sm:biz-p-6 md:biz-p-8 lg:biz-p-10 biz-p-4 2xl:biz-w-[649px] md:biz-w-[521.47px]">
      <div className="biz-mb-4">
        <span className="biz-text-[#00264D] biz-text-xl biz-leading-10 biz-font-semibold">
          Accounts
        </span>
      </div>

      {accountPricing && accountPricing.length > 0 && (
        <div className="biz-flex biz-flex-col">
          {accountPricing.map((item, index) => (
            <div
              key={index}
              className="biz-flex biz-flex-row biz-border-b biz-border-[#D5DBDD] biz-text-[#00264D] biz-font-normal biz-text-base biz-leading-10 biz-py-1"
            >
              <div className="biz-w-5/12 biz-leading-10">{item.limit} </div>
              <div className="biz-text-xs biz-text-[#143252]  biz-w-5/12 biz-px-1 biz-leading-10">
                {item.feeCondition && item.amount && <span>{item.feeCondition}</span>}
              </div>
              <div className="biz-font-semibold biz-text-right biz-w-2/12 biz-leading-10">
                {item.amount ? (
                  <span>
                    €{item.amount}
                    <span className="biz-font-normal">/year</span>
                  </span>
                ) : (
                  <span className="biz-text-[#29A37A]">{item.feeCondition}</span>
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
