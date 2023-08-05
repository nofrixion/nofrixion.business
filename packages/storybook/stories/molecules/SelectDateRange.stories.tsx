import * as React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { SelectDateRange, type TDateRangeOptions } from "@nofrixion/ui/molecules";

export default {
  title: "Molecules/Date selector",
  component: SelectDateRange,
  argTypes: {},
} as Meta<typeof SelectDateRange>;

const Template: StoryFn<typeof SelectDateRange> = ({ onValueChange, ...args }) => {
  const [dateRange, setDateRange] = React.useState<TDateRangeOptions | undefined>("last7Days");

  const handleOnValueChange = (value: TDateRangeOptions) => {
    setDateRange(value);
    onValueChange && onValueChange(value);
  };

  return <SelectDateRange value={dateRange} onValueChange={handleOnValueChange} {...args} />;
};

export const Showcase = Template.bind({});
Showcase.args = {
  // variant: 'paid',
};
