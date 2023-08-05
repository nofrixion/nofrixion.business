import * as React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "@nofrixion/ui";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["big", "medium", "small", "x-small"],
    },
    variant: {
      control: { type: "radio" },
      options: ["primary", "primaryDark", "secondary", "tertiary", "text"],
    },
    onClick: {
      action: "Clicked",
    },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => {
  return <Button {...args}>Hey there!</Button>;
};

export const Showcase = Template.bind({});
Showcase.args = {
  variant: "primary",
};
