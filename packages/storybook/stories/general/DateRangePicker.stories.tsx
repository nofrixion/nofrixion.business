import * as React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { DateRangePicker } from "@nofrixion/ui";
import { action } from "@storybook/addon-actions";

export default {
  title: "UI/DateRangePicker",
  component: DateRangePicker,
} as Meta<typeof DateRangePicker>;

const Template: StoryFn<typeof DateRangePicker> = (args) => <DateRangePicker {...args} />;

export const Showcase = Template.bind({});

Showcase.args = {
  onDateChange: action("Date Changed"),
};
