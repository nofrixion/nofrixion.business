import type { StorybookConfig } from "@storybook/react-vite";

import { resolve, join, dirname } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: [
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-essentials")
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  // async viteFinal(config, { configType }) {
  //   // customize the Vite config here
  //   return {
  //     ...config,
  //     resolve: {
  //       alias: [
  //         {
  //           find: "@nofrixion/ui",
  //           replacement: resolve(
  //             __dirname,
  //             "../../packages/ui/"
  //           ),
  //         },
  //       ],
  //     },
  //   };
  // }
};
export default config;
