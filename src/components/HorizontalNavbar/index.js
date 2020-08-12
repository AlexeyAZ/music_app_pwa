import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import get from 'lodash/get'
import { withRouter } from 'react-router'

import { Container } from '../Grid'

import styles from './styles.module.scss'

class HorizontalNavbar extends Component {
  constructor(props) {
    super(props)
    const activeKey = props.defaultKey || get(props, 'data.[0].key')

    this.state = {
      activeKey,
    }
  }

  moveToPath = key => {
    const { history, data } = this.props
    const { to } = data.find(item => item.key === key)
    history.push(to)
  }

  handleItemClick = key => {
    const { value, onItemClick } = this.props
    if (value) {
      return onItemClick(key)
    }
    return this.setState({ activeKey: key }, () => onItemClick(key))
  }

  render() {
    const { activeKey } = this.state
    const { data, value, className, isNavbarFixed } = this.props
    const currentKey = value || activeKey
    return (
      <div className={cn({ [styles.fixed]: isNavbarFixed })}>
        <Container>
          <div className={cn(styles.wrap, className)}>
            <div className={styles.container}>
              {data.map(({ key, title }) => (
                <button
                  type="button"
                  className={styles.listItem}
                  key={key}
                  onClick={() => this.handleItemClick(key)}
                >
                  <b className={currentKey === key ? styles.listItemText : ''}>{title}</b>
                </button>
              ))}
            </div>
          </div>
        </Container>
      </div>
    )
  }
}

HorizontalNavbar.propTypes = {
  isNavbarFixed: PropTypes.bool,
  className: PropTypes.string,
  value: PropTypes.string,
  data: PropTypes.array.isRequired,
  onItemClick: PropTypes.func,
  defaultKey: PropTypes.string,
  history: PropTypes.object.isRequired,
}
HorizontalNavbar.defaultProps = {
  isNavbarFixed: true,
  className: '',
  value: null,
  onItemClick: null,
  defaultKey: null,
}

export default withRouter(HorizontalNavbar)
