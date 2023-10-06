import { Meta, StoryFn } from '@storybook/react'

import StatusList from './StatusList'

export default {
  title: 'UI/Status List',
  component: StatusList,
  argTypes: {
    successStatusMessage: { control: 'text' },
    pendingStatusMessage: { control: 'text' },
    failureStatusMessage: { control: 'text' },
  },
} as Meta<typeof StatusList>

const StandardTemplate: StoryFn<typeof StatusList> = (args) => {
  return <StatusList {...args} />
}

export const Standard = StandardTemplate.bind({})
Standard.args = {
  successStatusMessage: '2 received',
  pendingStatusMessage: '1 in progress',
  failureStatusMessage: '1 failed',
}
