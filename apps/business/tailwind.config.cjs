/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
import sharedConfig from '@nofrixion/tailwind-config/tailwind.config.cjs'

module.exports = {
  presets: [sharedConfig],
  prefix: 'biz-',
}
