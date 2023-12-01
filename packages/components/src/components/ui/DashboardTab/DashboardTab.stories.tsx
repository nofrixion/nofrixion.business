import { PaymentRequestStatus } from '@nofrixion/moneymoov'
import * as Tabs from '@radix-ui/react-tabs'
import { Meta, StoryFn } from '@storybook/react'

import DashboardTab from './DashboardTab'

export default {
  title: 'UI/Dashboard Tab',
  component: DashboardTab,
  argTypes: {
    totalRecords: { control: 'number' },
    isLoading: { control: 'boolean' },
    totalAmountInEuros: { control: 'number' },
    totalAmountInPounds: { control: 'number' },
  },
  args: {
    isLoading: false,
  },
} as Meta<typeof DashboardTab>

const Template: StoryFn<typeof DashboardTab> = (args) => {
  return (
    <Tabs.Root onValueChange={() => {}}>
      {/* Keep the Tab to still get accessibility functions through the keyboard */}
      <Tabs.List className="flex shrink-0 gap-x-4 mb-4">
        <DashboardTab {...args}></DashboardTab>
      </Tabs.List>
      <Tabs.Content value=""></Tabs.Content>
    </Tabs.Root>
  )
}

export const Showcase = Template.bind({})

Showcase.args = {
  status: PaymentRequestStatus.All,
  totalRecords: 233,
  totalAmountInEuros: 1234.56,
  totalAmountInPounds: 1234.56,
}

export const All = Template.bind({})

All.args = {
  status: PaymentRequestStatus.All,
  totalRecords: 112,
  totalAmountInEuros: 1234.56,
  totalAmountInPounds: 1234.56,
}

export const AllEurosOnly = Template.bind({})

AllEurosOnly.args = {
  status: PaymentRequestStatus.All,
  totalRecords: 112,
  totalAmountInEuros: 1234.56,
}

export const AllPoundsOnly = Template.bind({})

AllPoundsOnly.args = {
  status: PaymentRequestStatus.All,
  totalRecords: 112,
  totalAmountInPounds: 1234.56,
}

export const AllLoading = Template.bind({})

AllLoading.args = {
  status: PaymentRequestStatus.All,
  totalRecords: 182,
  isLoading: true,
}

export const Unpaid = Template.bind({})

Unpaid.args = {
  status: PaymentRequestStatus.None,
  totalRecords: 112,
  totalAmountInEuros: 1234.56,
  totalAmountInPounds: 1234.56,
}

export const UnpaidEurosOnly = Template.bind({})

UnpaidEurosOnly.args = {
  status: PaymentRequestStatus.None,
  totalRecords: 112,
  totalAmountInEuros: 1234.56,
}

export const UnpaidPoundsOnly = Template.bind({})

UnpaidPoundsOnly.args = {
  status: PaymentRequestStatus.None,
  totalRecords: 112,
  totalAmountInPounds: 1234.56,
}

export const PartiallyPaid = Template.bind({})

PartiallyPaid.args = {
  status: PaymentRequestStatus.PartiallyPaid,
  totalRecords: 89,
  totalAmountInEuros: 1234.56,
  totalAmountInPounds: 1234.56,
}

export const PartiallyPaidEurosOnly = Template.bind({})

PartiallyPaidEurosOnly.args = {
  status: PaymentRequestStatus.PartiallyPaid,
  totalRecords: 89,
  totalAmountInEuros: 1234.56,
}

export const PartiallyPaidPoundsOnly = Template.bind({})

PartiallyPaidPoundsOnly.args = {
  status: PaymentRequestStatus.PartiallyPaid,
  totalRecords: 89,
  totalAmountInPounds: 1234.56,
}

export const Paid = Template.bind({})

Paid.args = {
  status: PaymentRequestStatus.FullyPaid,
  totalRecords: 47,
  totalAmountInEuros: 1234.56,
  totalAmountInPounds: 1234.56,
}

export const PaidEurosOnly = Template.bind({})

PaidEurosOnly.args = {
  status: PaymentRequestStatus.FullyPaid,
  totalRecords: 47,
  totalAmountInEuros: 1234.56,
}

export const PaidPoundsOnly = Template.bind({})

PaidPoundsOnly.args = {
  status: PaymentRequestStatus.FullyPaid,
  totalRecords: 47,
  totalAmountInPounds: 1234.56,
}
