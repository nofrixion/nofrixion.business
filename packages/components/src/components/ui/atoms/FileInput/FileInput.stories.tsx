import { action } from '@storybook/addon-actions'
import { Meta, StoryFn } from '@storybook/react'

import FileInput from './FileInput'

export default {
  title: 'Atoms/FileInput',
  component: FileInput,
} as Meta<typeof FileInput>

const Template: StoryFn<typeof FileInput> = (args) => {
  return (
    <div className="mt-64 mx-32">
      <FileInput {...args} />
    </div>
  )
}

export const Showcase = Template.bind({})

Showcase.args = {
  onFileAdded: action('File Changed'),
}
