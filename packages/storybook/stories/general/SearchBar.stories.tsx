import * as React from "react";
import { SearchBar } from "@nofrixion/ui";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "UI/SearchBar",
  component: SearchBar,
} as Meta<typeof SearchBar>;

const Template: StoryFn<typeof SearchBar> = (args) => {
  const [value, setValue] = React.useState<string>("");
  return <SearchBar {...args} value={value} setValue={setValue} />;
};

export const Default = Template.bind({});
