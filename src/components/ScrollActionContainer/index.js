import React, { Component } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import ScrollContainer from '../ScrollContainer'

import styles from './styles.module.scss'

const HORIZONTAL_CONTAINER_TYPE = 'horizontal'
const VERTICAL_CONTAINER_TYPE = 'vertical'

class ScrollActionContainer extends Component {
  horizontalContainer = null

  isScrollExist = false

  constructor(props) {
    super(props)

    this.state = {
      isScrollExist: false,
    }
  }

  componentDidMount() {
    const { type } = this.props
    this.setState({ isScrollExist: this.checkIsScrollExist() })

    setTimeout(() => {
      if (type === VERTICAL_CONTAINER_TYPE) {
        return window.addEventListener('scroll', this.handleVerticalScroll)
      }
      if (type === HORIZONTAL_CONTAINER_TYPE && this.horizontalContainer) {
        return this.horizontalContainer.addEventListener('scroll', this.handleHorizontalScroll)
      }
      return null
    }, 1000)
  }

  componentDidUpdate() {
    const { isScrollExist } = this.state
    if (this.checkIsScrollExist() !== isScrollExist) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isScrollExist: true })
    }
  }

  componentWillUnmount() {
    const { type } = this.props
    if (type === VERTICAL_CONTAINER_TYPE) {
      return window.removeEventListener('scroll', this.handleVerticalScroll)
    }
    if (type === HORIZONTAL_CONTAINER_TYPE) {
      return this.horizontalContainer.removeEventListener('scroll', this.handleHorizontalScroll)
    }
    return null
  }

  checkIsScrollExist = () => {
    const { type } = this.props
    if (type === VERTICAL_CONTAINER_TYPE) {
      const documentHeight = this.getDocumentHeight()
      return documentHeight > document.documentElement.clientHeight
    }
    if (type === HORIZONTAL_CONTAINER_TYPE) {
      const { scrollWidth } = this.horizontalContainer
      const documentWidth = this.getDocumentWidth()
      return documentWidth < scrollWidth
    }
    return null
  }

  getDocumentHeight = () => {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    )
  }

  getDocumentWidth = () => {
    return Math.max(
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.body.clientWidth,
      document.documentElement.clientWidth
    )
  }

  isScrollLimit = () => {
    const { type } = this.props
    if (type === VERTICAL_CONTAINER_TYPE) {
      const documentHeight = this.getDocumentHeight()
      const scrollPosition = parseInt(documentHeight - window.pageYOffset, 10)
      return (
        scrollPosition === document.documentElement.clientHeight ||
        scrollPosition === document.documentElement.clientHeight - 1
      )
    }
    if (type === HORIZONTAL_CONTAINER_TYPE) {
      const { scrollWidth, scrollLeft } = this.horizontalContainer
      const documentWidth = this.getDocumentWidth()
      return scrollWidth - scrollLeft - documentWidth === 0
    }
    return null
  }

  handleVerticalScroll = () => {
    const { onScrollEnd } = this.props
    if (this.isScrollLimit()) {
      onScrollEnd()
    }
  }

  handleHorizontalScroll = () => {
    const { onScrollEnd } = this.props
    if (this.isScrollLimit()) {
      onScrollEnd()
    }
  }

  static horizontalContainerType = HORIZONTAL_CONTAINER_TYPE

  static verticalContainerType = VERTICAL_CONTAINER_TYPE

  render() {
    const { isScrollExist } = this.state
    const { children, type } = this.props

    if (type === VERTICAL_CONTAINER_TYPE) {
      return (
        <div className={styles.content}>
          {children({ isScrollExist, isScrollLimit: this.isScrollLimit })}
        </div>
      )
    }
    if (type === HORIZONTAL_CONTAINER_TYPE) {
      return (
        <ScrollContainer
          containerRef={el => {
            this.horizontalContainer = el
          }}
        >
          {children({ isScrollExist, isScrollLimit: this.isScrollLimit })}
        </ScrollContainer>
      )
    }
    return null
  }
}

ScrollActionContainer.propTypes = {
  type: PropTypes.oneOf([VERTICAL_CONTAINER_TYPE, HORIZONTAL_CONTAINER_TYPE]),
  children: PropTypes.any,
  onScrollEnd: PropTypes.func,
}
ScrollActionContainer.defaultProps = {
  type: VERTICAL_CONTAINER_TYPE,
  children: null,
  onScrollEnd: noop,
}

export default ScrollActionContainer
