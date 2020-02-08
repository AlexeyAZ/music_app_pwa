import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ICON_THEMES } from 'constants'

import * as IconThemesModule from 'modules/iconThemes'

class ThemeChooser extends Component {
  handleThemeChange = themeName => {
    const { changeIconTheme } = this.props
    changeIconTheme({ activeTheme: themeName })
  }

  render() {
    const {
      iconThemes: { activeTheme },
    } = this.props
    return Object.keys(ICON_THEMES).map(themeKey => {
      const themeName = ICON_THEMES[themeKey]
      return (
        <label htmlFor={themeName} key={themeKey}>
          <input
            onChange={() => this.handleThemeChange(themeName)}
            id={themeName}
            checked={activeTheme === themeName}
            value={themeName}
            name="theme_chooser"
            type="radio"
          />
          <span>{themeKey}</span>
        </label>
      )
    })
  }
}

ThemeChooser.propTypes = {
  iconThemes: PropTypes.object.isRequired,
  changeIconTheme: PropTypes.func.isRequired,
}

const mapStateToProps = ({ iconThemes }) => ({
  iconThemes,
})

const mapDispatchToProps = dispatch => ({
  changeIconTheme: bindActionCreators(IconThemesModule.changeIconTheme, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemeChooser)
