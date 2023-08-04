import * as React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "@nofrixion/ui";

export default {
  title: "Button",
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => {
  return <Button {...args}>Hey there!</Button>;
};

export const Showcase = Template.bind({});
