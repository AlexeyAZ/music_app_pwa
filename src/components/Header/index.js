import React, { Component } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import { HEADER_TITLE_ID } from '../../constants'

import styles from './styles.module.scss'

import { Container } from '../Grid'

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
      <Container>
        <div className={styles.wrap}>
          <div>{this.renderLeftContent()}</div>
          <div>
            <p id={HEADER_TITLE_ID}>{title}</p>
          </div>
          <div>{renderRightContent()}</div>
        </div>
      </Container>
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
