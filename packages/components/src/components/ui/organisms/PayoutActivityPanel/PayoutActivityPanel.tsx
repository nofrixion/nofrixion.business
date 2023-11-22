import { PayoutEventTypesEnum } from '@nofrixion/moneymoov'

import { PayoutActivity } from '../../../../types/LocalTypes'
import { formatDateWithYearAndTime } from '../../../../utils/formatters'
import { Icon } from '../../atoms'
import { IconNames } from '../../atoms/Icon/Icon'

export interface PayoutActivityPanelProps {
  activities: PayoutActivity[]
}

const eventTypeToIconName = (eventType: PayoutEventTypesEnum): IconNames => {
  switch (eventType) {
    case PayoutEventTypesEnum.Created:
    case PayoutEventTypesEnum.Initiate:
    case PayoutEventTypesEnum.Queued:
      return 'created/16'
    case PayoutEventTypesEnum.Authorise:
      return 'authorise/16'
    case PayoutEventTypesEnum.Failure:
      return 'failed-red/16'
    case PayoutEventTypesEnum.Scheduled:
      return 'scheduled/16'
    case PayoutEventTypesEnum.Settle:
      return 'success/16'
    default:
      return 'created/16'
  }
}

const PayoutActivityPanel = ({ activities }: PayoutActivityPanelProps) => {
  const itemHeight = 25
  const gapHeight = 32

  const timelineHeight = `${activities.length * itemHeight + (activities.length - 2) * gapHeight}px`

  return (
    <div className="mt-16 mx-8 pb-28">
      <div className="text-default-text text-2xl font-semibold mb-10">Activity</div>
      <div className="flex flex-col gap-8 w-full relative">
        {activities && activities.length >= 0 && (
          <div
            style={{
              height: `${timelineHeight}`,
            }}
            className="ml-[0.46875rem] mt-[19px] w-px bg-border-grey absolute"
          ></div>
        )}
        {activities &&
          activities
            .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
            .map((activity, index) => {
              return (
                <div key={index} className="flex w-full items-center h-[25px]">
                  {index === 0 && (
                    <div className="w-4 z-10">
                      <Icon
                        name={eventTypeToIconName(activity.eventType)}
                        className="mt-0.5 mb-1 cursor-default fill-black"
                      />
                    </div>
                  )}
                  {index != 0 && (
                    <div className="w-4 z-10">
                      <div className="ml-1 mr-1 h-2 w-2 bg-border-grey-highlighted rounded-full my-auto"></div>
                    </div>
                  )}
                  <div className="flex flex-col w-full mt-5">
                    <div className="text-default-text font-normal text-[13px] pl-4 text-left">
                      {activity.text}
                    </div>
                    <div className="text-grey-text font-normal text-[13px] pl-4 text-left">
                      {formatDateWithYearAndTime(activity.timestamp)}
                    </div>
                  </div>
                  <div className="text-right w-[200px]">
                    {activity.status && (
                      <div className="text-[#454D54] bg-information-bg px-3 py-1 rounded-full text-xs whitespace-nowrap inline-block align-middle">
                        {activity.status}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
      </div>
    </div>
  )
}

export default PayoutActivityPanel
