import type { Preview } from "@storybook/react";

// TODO: Find a way to include built
// css automatically without having to
// import it when using the library
import "@nofrixion/ui/styles.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
