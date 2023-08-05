import * as React from "react";
import { FilterButton } from "@nofrixion/ui";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "UI/Filter Button",
  component: FilterButton,
} as Meta<typeof FilterButton>;

const Template: StoryFn<typeof FilterButton> = (args) => {
  return <FilterButton {...args} />;
};

export const Tags = Template.bind({});
Tags.args = {
  iconName: "tag/16",
  label: "Tags",
};

export const Currency = Template.bind({});
Currency.args = {
  iconName: "euros/16",
  label: "Currency",
};
