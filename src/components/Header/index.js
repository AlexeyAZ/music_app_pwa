import React, { Component } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import styles from './styles.module.scss'

class Header extends Component {
  renderBackButton = () => {
    const { backButtonText, onBackButtonClick } = this.props
    return (
      <button type="button" onClick={onBackButtonClick}>
        {backButtonText}
      </button>
    )
  }

  renderLeftContent = () => {
    const { hideBackButton, renderLeftContent } = this.props
    if (renderLeftContent) {
      return renderLeftContent()
    }
    if (hideBackButton) {
      return this.renderBackButton()
    }
    return null
  }

  render() {
    const { title, renderRightContent } = this.props
    return (
      <div className={styles.wrap}>
        <div>{this.renderLeftContent()}</div>
        <div>
          <p>{title}</p>
        </div>
        <div>{renderRightContent()}</div>
      </div>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string,
  hideBackButton: PropTypes.bool,
  backButtonText: PropTypes.string,
  onBackButtonClick: PropTypes.func,
  renderLeftContent: PropTypes.func,
  renderRightContent: PropTypes.func,
}
Header.defaultProps = {
  title: '',
  hideBackButton: false,
  backButtonText: 'Back',
  onBackButtonClick: noop,
  renderLeftContent: null,
  renderRightContent: noop,
}

export default Header
