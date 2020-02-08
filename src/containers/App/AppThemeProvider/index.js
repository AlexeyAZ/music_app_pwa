import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@xstyled/styled-components'

import { themes, themeDefaults } from 'styles'

import { GlobalThemeProvider, GlobalThemeConsumer } from 'components'

const AppThemeProvider = ({ children }) => (
  <GlobalThemeProvider>
    <GlobalThemeConsumer>
      {({ activeTheme }) => {
        console.log({ ...themes[activeTheme], ...themeDefaults })
        return (
          <ThemeProvider theme={{ ...themes[activeTheme], ...themeDefaults }}>
            {children}
          </ThemeProvider>
        )
      }}
    </GlobalThemeConsumer>
  </GlobalThemeProvider>
)

AppThemeProvider.propTypes = {
  children: PropTypes.any,
}
AppThemeProvider.defaultProps = {
  children: null,
}

export default AppThemeProvider
