import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import get from 'lodash/get'
import noop from 'lodash/noop'

import styles from './styles.module.scss'

class HorizontalNavbar extends Component {
  constructor(props) {
    super(props)
    const activeKey = props.defaultKey || get(props, 'data.[0].key')

    this.state = {
      activeKey,
    }
  }

  handleItemClick = async key => {
    const { onItemClick, value } = this.props
    if (value) {
      return onItemClick(key)
    }
    return this.setState({ activeKey: key }, () => onItemClick(key))
  }

  render() {
    const { activeKey } = this.state
    const { data, value, className } = this.props
    const currentKey = value || activeKey
    return (
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
    )
  }
}

HorizontalNavbar.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  data: PropTypes.array.isRequired,
  onItemClick: PropTypes.func,
  defaultKey: PropTypes.string,
}
HorizontalNavbar.defaultProps = {
  className: '',
  value: null,
  onItemClick: noop,
  defaultKey: null,
}

export default HorizontalNavbar
