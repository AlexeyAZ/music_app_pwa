import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Container } from '../../components'

import HeaderContainer from './HeaderContainer'
import Navbar from './Navbar'
import BottomSpacer from './BottomSpacer'

import PlayerWidget from '../PlayerWidget'

import styles from './styles.module.scss'

const footerNavbarData = [
  { href: '/library/favorites', label: 'Library', iconName: 'MusicLibrary' },
  { href: '/trending', label: 'Trending', iconName: 'Trending' },
  { href: '/search', label: 'Search', iconName: 'Search' },
  { href: '/profile', label: 'Profile', iconName: 'User' },
]

class Layout extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { children } = this.props
    return (
      <div className={styles.wrap}>
        <header className={styles.headerWrap}>
          <HeaderContainer />
        </header>
        <main className={styles.contentWrap}>
          <Container>{children}</Container>
        </main>
        <BottomSpacer />
        <footer className={styles.footerWrap}>
          <PlayerWidget />
          <Navbar data={footerNavbarData} />
        </footer>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.any,
}
Layout.defaultProps = {
  children: null,
}

export default Layout
