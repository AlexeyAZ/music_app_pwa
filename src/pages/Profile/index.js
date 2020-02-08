import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { withRouter } from 'react-router'

import { GlobalThemeContext } from 'components'

import * as AuthModule from 'modules/auth'

import ThemeChooser from '../../containers/ThemeChooser'

class Profile extends Component {
  static contextType = GlobalThemeContext

  handleLogoutButtonClick = () => {
    const { resetAuthOptions } = this.props
    resetAuthOptions()
    window.location.href = '/'
  }

  render() {
    const { activeTheme, toggleTheme } = this.context
    return (
      <div>
        <button type="button" onClick={() => toggleTheme()}>
          Active theme: {activeTheme}
        </button>
        <button type="button" onClick={this.handleLogoutButtonClick}>
          Logout
        </button>
        <ThemeChooser />
      </div>
    )
  }
}

Profile.propTypes = {
  resetAuthOptions: PropTypes.func.isRequired,
}

const mapStateToProps = ({ authOptions }) => ({
  authOptions,
})

const mapDispatchToProps = dispatch => ({
  resetAuthOptions: bindActionCreators(AuthModule.resetAuthOptions, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(Profile)
