import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Button } from '@nofrixion/ui';
// TODO: Include TailwindCSS inside of @nofrixion/ui

export default {
  title: 'Button',
  component: Button,
} as Meta<typeof Button>;


const Template: StoryFn<typeof Button> = (args) => {
  return <Button {...args} />;
}

export const Showcase = Template.bind({});