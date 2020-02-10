import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import cn from 'classnames'
import { withRouter } from 'react-router'

import routes from 'routes'

import { Navbar, HorizontalNavbar } from 'components'

import HeaderContainer from './HeaderContainer'
import PlayerWidget from '../PlayerWidget'

import styles from './styles.module.scss'

const navbarData = [
  { href: '/library/playlists', label: 'Library' },
  { href: '/trending', label: 'Trending' },
  { href: '/search', label: 'Search' },
  { href: '/profile', label: 'Profile' },
]

const libraryNavbarData = routes
  .find(route => route.path === '/library')
  .routes.map(route => ({ ...route, key: route.title.toLowerCase() }))

class Layout extends Component {
  handleNavbarItemClick = key => {
    const { history } = this.props
    const { path } = libraryNavbarData.find(item => item.key === key)
    history.push(path)
  }

  isShowHorizontalNavbar = () => {
    const { location } = this.props
    if (location.pathname.includes('/library')) {
      return true
    }
    return false
  }

  render() {
    const {
      children,
      location,
      playbackInfo: { id: trackId },
    } = this.props
    const navbarValue = location.pathname.split('/')[2]
    const isShowHorizontalNavbar = this.isShowHorizontalNavbar()
    return (
      <div
        className={cn(
          {
            [styles.wrapWithHorizontalNavbar]: isShowHorizontalNavbar,
            [styles.wrapWithWidget]: trackId,
          },
          styles.wrap
        )}
      >
        <div className={styles.headerWrap}>
          <HeaderContainer />
        </div>
        {isShowHorizontalNavbar && (
          <div className={styles.horizontalNavbarWrap}>
            <HorizontalNavbar
              value={navbarValue}
              data={libraryNavbarData}
              onItemClick={this.handleNavbarItemClick}
            />
          </div>
        )}
        <div>{children}</div>
        <div className={styles.footerWrap}>
          {trackId && <PlayerWidget />}
          <Navbar data={navbarData} />
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.any,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  playbackInfo: PropTypes.object.isRequired,
}
Layout.defaultProps = {
  children: null,
}

const mapStateToProps = ({ playbackInfo }) => ({
  playbackInfo,
})

export default compose(
  connect(mapStateToProps),
  withRouter
)(Layout)
