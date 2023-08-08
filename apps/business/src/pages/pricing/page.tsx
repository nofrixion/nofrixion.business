import PricingCard, { PricingCardProps } from '../../components/ui/PricingCard'
import ScrollArea from '../../components/ui/ScrollArea'
import useUserStore from '../../lib/stores/useUserStore'
import { sendSlackMessage } from '../../lib/utils/utils'
import { useState } from 'react'
import PricingCardPayByBank, {
  PricingPayByBankProps,
} from '../../components/ui/PricingCardPayByBank'
import PricingCardAccounts, { PricingAccountsProps } from '../../components/ui/PricingCardAccounts'

const pricingCards: PricingCardProps[] = [
  {
    title: 'Basic',
    extraTitle: 'Essential money movement operations.',
    price: 40,
    items: [
      'Manage your accounts',
      'Create and approve manual payouts',
      'Approve multiple payouts',
      '*50 free* monthly SEPA transactions+',
    ],
  },
  {
    title: 'Accounts receivable',
    extraTitle: 'Get paid faster. Automate collections.',
    price: 75,
    extraText: 'All features from *Basic* plus:',
    items: [
      'Manage Payment Requests',
      'Support for Partial Payments',
      'Advanced filtering and tags for Payment Requests',
      '*200 free* monthly SEPA transactions+',
    ],
  },
  {
    title: 'Accounts payable',
    extraTitle: 'Automatic, programable payouts. Eliminate manual payment processes.',
    price: 75,
    extraText: 'All features from *Basic* plus:',
    items: [
      'Connect with Xero',
      'Import approved invoices',
      'Automatically create Payruns',
      'Create, edit, approve Payruns',
      'Remittance notes',
      'Automatic invoice reconciliation with XERO',
      '*200 free* monthly SEPA transactions+',
    ],
  },
  {
    title: 'Full',
    extraTitle: 'Get paid and Pay others and take back control of your financial operations.',
    price: 120,
    extraText: 'All features from *Basic*, *Accounts receivable* and *Accounts payable*.',
    items: ['*300 free* monthly SEPA transactions+'],
  },
]

const payPerUsePricing = [
  'View-only access to your account balance, transactions and payment requests',
  'Predefined funds transfer to your bank account',
  'Refund payments',
  'Single user',
]

const pricingPayByBank: PricingPayByBankProps = {
  payByBankPricing: [
    {
      limit: 'Up to €99',
      feeCondition: 'Fixed fee',
      amount: 0.5,
    },
    {
      limit: '€100 to €499',
      feeCondition: 'Fixed fee',
      amount: 1.0,
    },
    {
      limit: '€500 to €999',
      feeCondition: 'Fixed fee',
      amount: 2.5,
    },
    {
      limit: '€1,000 to €1,999',
      feeCondition: 'Fixed fee',
      amount: 5.0,
    },
    {
      limit: '€2,000 to €4,999',
      feeCondition: 'Fixed fee',
      amount: 7.5,
    },
    {
      limit: '€5,000 to €9,999',
      feeCondition: 'Fixed fee',
      amount: 10.0,
    },
    {
      limit: '€10,000 +',
      feeCondition: 'Fixed fee',
      amount: 20.0,
    },
  ],
}

const pricingAccounts: PricingAccountsProps = {
  accountPricing: [
    {
      limit: 'Up to 10 accounts',
      feeCondition: 'FREE',
    },
    {
      limit: 'Extra account',
      amount: 10,
    },
    {
      limit: 'Dormant account',
      feeCondition: 'After 6 months of inactivity',
      amount: 10,
    },
  ],
}

const PricingPage: React.FC = () => {
  const { user } = useUserStore()

  const [isInterested, setIsInterested] = useState(false)

  const onInterestedClick = ({ amount, name }: { amount: number; name: string }) => {
    const message = `🤑 ${user?.emailAddress ?? 'Someone'} wants to pay ${amount}€/m for *${name}*`

    sendSlackMessage(message)
  }

  const onPayPerUseClick = () => {
    setIsInterested(true)

    const message = `🤑 ${user?.emailAddress ?? 'Someone'} is interested in pay-per-use.`

    sendSlackMessage(message)
  }

  return (
    <>
      <h1 className="biz-text-[1.75rem]/8 biz-font-medium biz-mb-[10px]">
        MoneyMoov for Business Packages
      </h1>
      <span className="biz-flex biz-text-[#00264D] biz-text-base biz-mb-12">
        Pricing for up to 5 users. Contact us for Larger / Enterprise pricing.
      </span>

      <div className="-biz-mx-8 md:-biz-mx-[72px]">
        <ScrollArea>
          <div className="biz-flex biz-gap-4 biz-px-8 md:biz-px-14">
            {pricingCards.map((card, index) => (
              <PricingCard
                key={index}
                {...card}
                onInterestedClick={() =>
                  onInterestedClick({ amount: card.price, name: card.title })
                }
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="biz-mb-8 biz-pl-6">
        <span className="biz-flex biz-text-[#00264D] biz-text-sm biz-leading-6">
          + Additional SEPA transactions: €0.25 / transaction.
        </span>
      </div>

      {/*<div className="biz-flex biz-flex-wrap xl:biz-h-[214px] biz-bg-white biz-flex-row biz-p-6">
        <div className="biz-pr-8 biz-w-[301px] md:biz-pb-4 biz-pb-4">
          <div className="biz-text-[#05C7C6] biz-leading-[43.57px] biz-font-semibold biz-text-4xl biz-mb-4">
            PAY-PER-USE
          </div>
          <span className="biz-leading-5 biz-font-normal biz-text-[13px]">
            For customers using our ecommerce plugins or through direct API
            access.
          </span>
        </div>
        <div className="biz-pr-8 biz-w-[596px] md:biz-pb-4 biz-pb-4">
          <ul
            className="biz-pl-5 biz-text-sm/6"
            style={{
              listStyleImage: `url('${IconListCheck.src}')`,
            }}
          >
            {payPerUsePricing.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="2xl:biz-w-[382.84px] xl:biz-w-[182.84px] biz-w-full biz-text-right md:biz-py-4 md:biz-pr-6">
          {!isInterested ? (
            <Button
              className="biz-mx-auto biz-py-3 biz-px-6"
              onClick={onPayPerUseClick}
            >
              {"Request"}
            </Button>
          ) : (
            <InfoBox
              className="biz-text-left biz-w-full biz-py-3 biz-px-6"
              title="Thanks!"
              message="Our sales team will contact you soon."
            />
          )}
        </div>
          </div>*/}

      <div className="biz-mb-4 biz-mt-12">
        <h1 className="biz-text-[1.75rem]/8 biz-font-medium biz-mb-[10px]">Addtional Fees</h1>
      </div>

      <div className="biz-flex biz-flex-wrap biz-mb-4">
        <PricingCardPayByBank payByBankPricing={pricingPayByBank.payByBankPricing} />
        <PricingCardAccounts accountPricing={pricingAccounts.accountPricing} />
      </div>
    </>
  )
}

export default PricingPage
