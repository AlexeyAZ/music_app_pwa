import { css } from '@xstyled/styled-components'

const themes = {
  primary: {
    buttons: {
      primary: css`
        color: red;
      `,
      secondary: css`
        color: blue;
      `,
    },
  },
  secondary: {
    buttons: {
      primary: css`
        color: green;
      `,
      secondary: css`
        color: yellow;
      `,
    },
  },
}

export default themes
