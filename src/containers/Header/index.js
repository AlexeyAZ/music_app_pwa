import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { AUTH, CURRENT_API_NAME, AVAILABLE_API } from 'constants'
import { localStore } from 'config'

class Header extends Component {
  state = {
    currentApi: null,
  }

  componentDidMount() {
    const currentApi = localStore.getItem(CURRENT_API_NAME)
    this.setState({ currentApi })
  }

  clearStorage = () => {
    localStore.removeItem(AUTH.ACCESS_TOKEN_NAME)
    localStore.removeItem(AUTH.REFRESH_TOKEN_NAME)
    localStore.removeItem(AUTH.EXPIRATION_DATE_NAME)
  }
  
  handleRadioButtonClick = ({ target: { value } }) => {
    this.setState({ currentApi: value }, () => {
      localStore.setItem(CURRENT_API_NAME, value)
      this.clearStorage()
      window.location.href = '/login'
    })
  }

  handleLogoutButtonClick = () => {
    this.clearStorage()
    window.location.href = '/'
  }

  render () {
    const { currentApi } = this.state
    return (
      <div>
        {Object.keys(AVAILABLE_API).map(apiName => (
          <label htmlFor={AVAILABLE_API[apiName]} key={apiName}>
            <input
              onChange={this.handleRadioButtonClick}
              type="radio"
              name="current_api"
              id={AVAILABLE_API[apiName]}
              value={AVAILABLE_API[apiName]}
              checked={currentApi === AVAILABLE_API[apiName]}
            />
            <span>{apiName}</span>
          </label>
        ))}
        <button type="button" onClick={this.handleLogoutButtonClick}>Logout</button>
      </div>
    )
  }
}

Header.propTypes = {

}

export default Header