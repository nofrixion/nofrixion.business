import PricingCard, { PricingCardProps } from '../../components/ui/PricingCard'
import PricingCardAccounts, { PricingAccountsProps } from '../../components/ui/PricingCardAccounts'
import PricingCardPayByBank, {
  PricingPayByBankProps,
} from '../../components/ui/PricingCardPayByBank'
import ScrollArea from '../../components/ui/ScrollArea'
import useUserStore from '../../lib/stores/useUserStore'
import { sendSlackMessage } from '../../lib/utils/utils'

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

  const onInterestedClick = ({ amount, name }: { amount: number; name: string }) => {
    const message = `🤑 ${user?.emailAddress ?? 'Someone'} wants to pay ${amount}€/m for *${name}*`

    sendSlackMessage(message)
  }

  return (
    <>
      <div className="md:px-4">
        <h1 className="text-[1.75rem]/8 font-medium mb-[10px]">MoneyMoov for Business Packages</h1>
        <span className="flex text-[#00264D] text-base mb-12">
          Pricing for up to 5 users. Contact us for Larger / Enterprise pricing.
        </span>
      </div>
      <div className="-mx-8 md:-mx-[56px]">
        <ScrollArea>
          <div className="flex gap-4 px-8 md:px-14">
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

      <div className="mb-8 pl-4">
        <span className="flex text-[#00264D] text-sm leading-6">
          + Additional SEPA transactions: €0.25 / transaction.
        </span>
      </div>

      {/*<div className="flex flex-wrap xl:h-[214px] bg-white flex-row p-6">
        <div className="pr-8 w-[301px] md:pb-4 pb-4">
          <div className="text-[#05C7C6] leading-[43.57px] font-semibold text-4xl mb-4">
            PAY-PER-USE
          </div>
          <span className="leading-5 font-normal text-[13px]">
            For customers using our ecommerce plugins or through direct API
            access.
          </span>
        </div>
        <div className="pr-8 w-[596px] md:pb-4 pb-4">
          <ul
            className="pl-5 text-sm/6"
            style={{
              listStyleImage: `url('${IconListCheck.src}')`,
            }}
          >
            {payPerUsePricing.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="2xl:w-[382.84px] xl:w-[182.84px] w-full text-right md:py-4 md:pr-6">
          {!isInterested ? (
            <Button
              className="mx-auto py-3 px-6"
              onClick={onPayPerUseClick}
            >
              {"Request"}
            </Button>
          ) : (
            <InfoBox
              className="text-left w-full py-3 px-6"
              title="Thanks!"
              message="Our sales team will contact you soon."
            />
          )}
        </div>
          </div>*/}

      <div className="mb-4 mt-12 md:px-4">
        <h1 className="text-[1.75rem]/8 font-medium mb-[10px]">Addtional Fees</h1>
      </div>

      <div className="flex flex-wrap mb-4">
        <PricingCardPayByBank payByBankPricing={pricingPayByBank.payByBankPricing} />
        <PricingCardAccounts accountPricing={pricingAccounts.accountPricing} />
      </div>
    </>
  )
}

export default PricingPage
