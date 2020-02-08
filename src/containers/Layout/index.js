import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Navbar, Box } from 'components'

import HeaderContainer from './HeaderContainer'
import PlayerWidget from '../PlayerWidget'

const LayoutWrap = styled(Box)``
const LayoutContainer = styled(Box)``

const navbarData = [
  { href: '/library/playlists', label: 'Library' },
  { href: '/trending', label: 'Trending' },
  { href: '/search', label: 'Search' },
  { href: '/profile', label: 'Profile' },
]

// TODO comment
// eslint-disable-next-line react/prefer-stateless-function
class Layout extends Component {
  render() {
    const {
      children,
      playbackStatus: { trackId },
    } = this.props
    return (
      <LayoutWrap pt={50} pb={trackId ? 150 : 50}>
        <LayoutContainer bg="white" position="fixed" top="0" left="0" height={50} width="100%">
          <HeaderContainer />
        </LayoutContainer>
        <LayoutWrap>{children}</LayoutWrap>
        <LayoutContainer bg="white" position="fixed" bottom="0" left="0" width="100%">
          {trackId && (
            <Box height={100}>
              <PlayerWidget />
            </Box>
          )}
          <Box height={50}>
            <Navbar data={navbarData} />
          </Box>
        </LayoutContainer>
      </LayoutWrap>
    )
  }
}

Layout.propTypes = {
  playbackStatus: PropTypes.object.isRequired,
  children: PropTypes.any,
}
Layout.defaultProps = {
  children: null,
}

const mapStateToProps = ({ playbackStatus }) => ({
  playbackStatus,
})

export default connect(mapStateToProps)(Layout)
