import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'

import '../src/styles/index.scss'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    defaultViewport: 'mobile',
    viewports: {
      mobile: {
        name: 'mobile',
        styles: {
          width: '320px',
          height: '400px',
        },
      },
    },
  },
}
