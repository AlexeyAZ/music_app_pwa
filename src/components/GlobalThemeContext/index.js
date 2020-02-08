import React, { Component } from 'react'
import PropTypes from 'prop-types'

const GlobalThemeContext = React.createContext({ activeTheme: 'primary', toggleTheme: () => {} })

class GlobalThemeProvider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTheme: 'primary',
      // eslint-disable-next-line react/no-unused-state
      toggleTheme: this.toggleTheme,
    }
  }

  toggleTheme = () => {
    const { activeTheme } = this.state
    this.setState({ activeTheme: activeTheme === 'primary' ? 'secondary' : 'primary' })
  }

  render() {
    const { children } = this.props
    return <GlobalThemeContext.Provider value={this.state}>{children}</GlobalThemeContext.Provider>
  }
}

const GlobalThemeConsumer = GlobalThemeContext.Consumer

GlobalThemeProvider.propTypes = {
  children: PropTypes.any,
}
GlobalThemeProvider.defaultProps = {
  children: null,
}

export { GlobalThemeProvider, GlobalThemeContext, GlobalThemeConsumer }
