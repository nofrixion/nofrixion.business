import { PayoutEventTypesEnum } from '@nofrixion/moneymoov'
import { Meta, StoryFn } from '@storybook/react'
import { addDays } from 'date-fns'

import { PayoutActivity } from '../../../../types/LocalTypes'
import PayoutActivityPanel from './PayoutActivityPanel'

const activities: PayoutActivity[] = [
  {
    text: 'Created by you',
    timestamp: addDays(new Date(), -5),
    status: 'Pending authorisation',
    eventType: PayoutEventTypesEnum.Created,
  },
  {
    text: 'Authorised by you',
    timestamp: addDays(new Date(), -4),
    status: '',
    eventType: PayoutEventTypesEnum.Authorise,
  },
  {
    text: 'Waiting for...',
    timestamp: addDays(new Date(), -3),
    status: 'Queued',
    eventType: PayoutEventTypesEnum.Queued,
  },
  {
    text: 'Waiting for bank',
    timestamp: addDays(new Date(), -2),
    status: 'Queued upstream',
    eventType: PayoutEventTypesEnum.Initiate,
  },
  {
    text: 'Successfully paid',
    timestamp: addDays(new Date(), -1),
    status: 'Processed',
    eventType: PayoutEventTypesEnum.Settle,
  },
]

export default {
  title: 'Organisms/Payout Activity Panel',
  component: PayoutActivityPanel,
} as Meta

const Template: StoryFn<typeof PayoutActivityPanel> = (args) => {
  return (
    <div className="px-14 py-10">
      <PayoutActivityPanel {...args} />
    </div>
  )
}
export const Default = Template.bind({})
Default.args = {
  activities: activities,
}
