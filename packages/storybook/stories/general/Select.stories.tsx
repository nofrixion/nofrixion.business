import * as React from "react";
import { StoryFn, Meta } from "@storybook/react";

import { Listbox, ListboxOption } from "@nofrixion/ui";

export default {
  title: "UI/Listbox",
  component: Listbox,
  argTypes: {
    options: {
      control: {
        type: "array",
      },
    },
    selected: {
      control: {
        type: "select",
        options: ["Revolut", "Fineco", "Bank of Ireland", "NoFrixion", "AIB"],
      },
    },
    onChange: {
      action: "Changed",
    },
  },
} as Meta<typeof Listbox>;

const Template: StoryFn<typeof Listbox> = (args) => {
  const [selected, setSelected] = React.useState<ListboxOption>(args.options[0]);

  const onChangeValue = (value: ListboxOption) => {
    setSelected(value);
  };

  return (
    <>
      <Listbox {...args} selected={selected} onChange={onChangeValue} />
    </>
  );
};

export const Showcase = Template.bind({});

const banksOptions = [
  {
    value: "1",
    label: "Revolut",
  },
  {
    value: "2",
    label: "Fineco",
  },
  {
    value: "3",
    label: "Bank of Ireland",
  },
  {
    value: "4",
    label: "NoFrixion",
  },
  {
    value: "5",

    label: "AIB",
  },
];

Showcase.args = {
  options: banksOptions,
};
