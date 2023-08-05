import * as React from "react";
import { StoryFn, Meta } from "@storybook/react";

import { PaymentNotificationsModal } from "@nofrixion/ui";

export default {
  title: "UI/Payment Notifications Modal",
  component: PaymentNotificationsModal,
  argTypes: {
    onApply: {
      action: "Apply",
    },
  },
} as Meta<typeof PaymentNotificationsModal>;

const Template: StoryFn<typeof PaymentNotificationsModal> = (args) => <PaymentNotificationsModal {...args} />;

export const Showcase = Template.bind({});
Showcase.args = {
  open: true,
};
