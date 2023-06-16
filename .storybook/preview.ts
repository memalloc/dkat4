import { Preview } from '@storybook/react'
// import { withThemeFromJSXProvider } from '@storybook/addon-styling'
// import { createGlobalStyle  } from 'styled-components'

// import "../src/less/typefaces/input-mono.less"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    layout : 'fullscreen',
    options: { showPanel: false }
  }
};
export default preview;

/*
const GlobalStyles = createGlobalStyle`

  body {
    color: red !important;
  }

`
export const decorators = [
  withThemeFromJSXProvider({
    GlobalStyles
  }),
];
*/