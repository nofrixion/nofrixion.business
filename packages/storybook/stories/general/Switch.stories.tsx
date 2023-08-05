import * as React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Switch } from "@nofrixion/ui";

export default {
  title: "UI/Switch",
  component: Switch,
} as Meta<typeof Switch>;

const Template: StoryFn<typeof Switch> = (args) => {
  const [enabled, setEnabled] = React.useState<boolean>(false);

  const onChangeEnabled = (checked: boolean) => {
    setEnabled(checked);
  };
  return <Switch {...args} value={enabled} onChange={onChangeEnabled} />;
};

export const PayByBank = Template.bind({});
PayByBank.args = {
  label: "Pay by Bank",
  iconName: "bank/24",
};

export const Cards = Template.bind({});
Cards.args = {
  label: "Credit and debit card",
  iconName: "card/24",
};

export const ApplePay = Template.bind({});
ApplePay.args = {
  label: "Apple Pay",
  iconName: "wallets/24",
};

export const BitcoinLightning = Template.bind({});
BitcoinLightning.args = {
  label: "Bitcoin Lightning",
  iconName: "bitcoin/24",
};
