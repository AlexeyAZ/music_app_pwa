import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { withRouter } from 'react-router'

import routes from 'routes'

import { Container, Navbar, HorizontalNavbar } from 'components'

import HeaderContainer from './HeaderContainer'
import BottomSpacer from './BottomSpacer'

import PlayerWidget from '../PlayerWidget'

import styles from './styles.module.scss'

const navbarData = [
  { href: '/library/favorites', label: 'Library' },
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
    console.log('render Layout')
    const { children, location } = this.props
    const navbarValue = location.pathname.split('/')[2]
    const isShowHorizontalNavbar = this.isShowHorizontalNavbar()
    return (
      <div
        className={cn(
          {
            [styles.wrapWithHorizontalNavbar]: isShowHorizontalNavbar,
          },
          styles.wrap
        )}
      >
        <header className={styles.headerWrap}>
          <HeaderContainer />
        </header>
        {isShowHorizontalNavbar && (
          <div className={styles.horizontalNavbarWrap}>
            <HorizontalNavbar
              value={navbarValue}
              data={libraryNavbarData}
              onItemClick={this.handleNavbarItemClick}
            />
          </div>
        )}
        <main className={styles.contentWrap}>
          <Container>{children}</Container>
        </main>
        <BottomSpacer />
        <footer className={styles.footerWrap}>
          <PlayerWidget />
          <Navbar data={navbarData} />
        </footer>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.any,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
Layout.defaultProps = {
  children: null,
}

export default withRouter(Layout)
