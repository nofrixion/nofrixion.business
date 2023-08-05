import * as React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { SelectSorter, type TSorterOptions } from "@nofrixion/ui/molecules";

export default {
  title: "Molecules/Select Sorter",
  component: SelectSorter,
  argTypes: {},
} as Meta<typeof SelectSorter>;

const Template: StoryFn<typeof SelectSorter> = ({ onValueChange, ...args }) => {
  const [dateRange, setDateRange] = React.useState<TSorterOptions | undefined>("moreRecentFirst");

  const handleOnValueChange = (value: TSorterOptions) => {
    setDateRange(value);
    onValueChange && onValueChange(value);
  };

  return <SelectSorter value={dateRange} onValueChange={handleOnValueChange} {...args} />;
};

export const Showcase = Template.bind({});
Showcase.args = {
  // variant: 'paid',
};
