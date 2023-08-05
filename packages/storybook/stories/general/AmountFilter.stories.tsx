import * as React from "react";
import { AmountFilter } from "@nofrixion/ui";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "UI/Amount Filter",
  component: AmountFilter,
} as Meta<typeof AmountFilter>;

const Template: StoryFn<typeof AmountFilter> = () => {
  const [localCurrency, setLocalCurrency] = React.useState<string | undefined>();
  const [localMinAmount, setLocalMinAmount] = React.useState<number | undefined>();
  const [localMaxAmount, setLocalMaxAmount] = React.useState<number | undefined>();

  return (
    <AmountFilter
      currency={localCurrency}
      setCurrency={setLocalCurrency}
      minAmount={localMinAmount}
      setMinAmount={setLocalMinAmount}
      maxAmount={localMaxAmount}
      setMaxAmount={setLocalMaxAmount}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
