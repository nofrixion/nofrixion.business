import { PaymentRequestStatus, PayoutStatus, UserStatus } from '@nofrixion/moneymoov'
import * as Tabs from '@radix-ui/react-tabs'
import classNames from 'classnames'

export interface TabProps {
  status: string
  totalRecords: number
  isLoading?: boolean
  totalAmountInEuros?: number
  totalAmountInPounds?: number
}

const getSpecificStatusClasses = (status: string) => {
  return classNames({
    "fill-[#ABB2BA] [&>span]:text-defaultText data-[state='active']:border-[#73808C]":
      status === PaymentRequestStatus.None ||
      status === PaymentRequestStatus.Authorized ||
      status === PayoutStatus.PENDING ||
      status === UserStatus.Invited,
    "fill-[#ABB2BA] [&>span]:text-defaultText data-[state='active']:border-[#40BFBF]":
      status === PaymentRequestStatus.All ||
      status === PayoutStatus.All ||
      status === UserStatus.All,
    "fill-[#E88C30] [&>span]:text-[#B25900] data-[state='active']:border-[#E88C30]":
      status === PaymentRequestStatus.PartiallyPaid ||
      status === PayoutStatus.PENDING_APPROVAL ||
      status === UserStatus.RolePending,
    "fill-[#00CC88] [&>span]:text-positive-green data-[state='active']:border-[#29A37A]":
      status === PaymentRequestStatus.FullyPaid ||
      status === PayoutStatus.PROCESSED ||
      status === UserStatus.Active,
    "fill-negative-red [&>span]:text-negative-red data-[state='active']:border-[#DA0C30]":
      status === PayoutStatus.FAILED,
    "fill-blue-text [&>span]:text-blue-text data-[state='active']:border-[#0088CC]":
      status === PayoutStatus.SCHEDULED,
  })
}

const getDisplayTextForStatus = (status: string) => {
  switch (status) {
    /* PaymentRequests */
    case PaymentRequestStatus.PartiallyPaid:
      return 'Partially paid'
    case PaymentRequestStatus.FullyPaid:
      return 'Paid'
    case PaymentRequestStatus.None:
      return 'Unpaid'
    case PaymentRequestStatus.Authorized:
      return 'Authorized'
    /* Payouts */
    case PayoutStatus.FAILED:
      return 'Failed'
    case PayoutStatus.PENDING:
      return 'In progress'
    case PayoutStatus.PENDING_APPROVAL:
      return 'Pending authorisation'
    case PayoutStatus.PROCESSED:
      return 'Paid'
    case UserStatus.Invited:
      return 'Invited'
    case UserStatus.Active:
      return 'Active'
    case UserStatus.RolePending:
      return 'Role pending'
    case PayoutStatus.SCHEDULED:
      return 'Scheduled'
    default:
      return 'All'
  }
}

const showIndicator = (status: string) => {
  switch (status) {
    case PaymentRequestStatus.None:
    case PaymentRequestStatus.PartiallyPaid:
    case PaymentRequestStatus.FullyPaid:
    case PaymentRequestStatus.Authorized:
    case PayoutStatus.PENDING:
    case PayoutStatus.PENDING_APPROVAL:
    case PayoutStatus.PROCESSED:
    case PayoutStatus.SCHEDULED:
    case PayoutStatus.FAILED:
    case UserStatus.Invited:
    case UserStatus.Active:
    case UserStatus.RolePending:
      return true
    default:
      return false
  }
}

const DashboardTab = ({
  status,
  totalRecords,
  isLoading = false,
  totalAmountInEuros,
  totalAmountInPounds,
}: TabProps) => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <Tabs.Trigger
      value={status}
      className={classNames(
        'flex flex-col items-center xl:items-start w-36 h-20 px-2 pt-2 pb-4 rounded-lg lg:w-full lg:h-28 xl:pl-6 xl:pr-4 lg:pt-6 lg:pb-8 bg-white border-2 border-transparent transition hover:border-border-grey',
        getSpecificStatusClasses(status),
      )}
    >
      <span className="text-xs/6 lg:text-sm/6 font-normal flex items-center mb-2 leading-6">
        {showIndicator(status) && (
          <div className="items-center whitespace-nowrap inline-block mr-1.5">
            <svg
              width="6"
              height="6"
              viewBox="0 0 6 6"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-inherit"
            >
              <circle cx="3" cy="3" r="3" />
            </svg>
          </div>
        )}

        {getDisplayTextForStatus(status)}
      </span>

      <div className="relative items-center xl:flex xl:justify-between w-full">
        <div
          className={classNames(
            'animate-pulse absolute left-0 pl-8 top-0 bottom-0 my-auto -translate-x-1/2 flex items-center',
            {
              invisible: !isLoading,
            },
          )}
        >
          <div className="h-2 w-8 bg-[#E0E9EB] rounded-lg"></div>
        </div>
        <div>
          <span
            className={classNames(
              'block text-[1.75rem]/6 font-medium truncate leading-6 lg:leading-[48px]',
              {
                invisible: isLoading,
              },
            )}
          >
            {totalRecords}
          </span>
        </div>
        <div className="hidden xl:flex flex-col justify-center items-end">
          {totalAmountInEuros !== undefined && (
            <span
              className={classNames('text-xs lg:text-sm/6 font-medium', {
                invisible: isLoading,
              })}
            >
              € {formatter.format(totalAmountInEuros)}
            </span>
          )}
          {totalAmountInPounds !== undefined && (
            <span
              className={classNames('text-xs lg:text-sm/6 font-medium', {
                invisible: isLoading,
              })}
            >
              £ {formatter.format(totalAmountInPounds)}
            </span>
          )}
        </div>
      </div>
    </Tabs.Trigger>
  )
}

export default DashboardTab
