import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash/get'
import noop from 'lodash/noop'
import { system } from 'styled-system'

import Box from '../Box'

const NavbarContainer = styled(Box)`
  ${system({
    navbarHeight: {
      property: 'height',
      scale: 'navbarHeight',
    },
  })}
`
NavbarContainer.defaultProps = {
  navbarHeight: 0,
  overflow: 'auto',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const NavbarItem = styled(Box)`
  &:last-child {
    margin-right: 0;
  }
`
NavbarItem.defaultProps = {
  mr: 3,
}

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
    const { data, value } = this.props
    const currentKey = value || activeKey
    return (
      <Box overflow="hidden" boxShadow="blockShadow">
        <NavbarContainer>
          {data.map(({ key, title }) => (
            <NavbarItem key={key} onClick={() => this.handleItemClick(key)}>
              <Box as="b" color={currentKey === key ? 'red' : 'black'}>
                {title}
              </Box>
            </NavbarItem>
          ))}
        </NavbarContainer>
      </Box>
    )
  }
}

HorizontalNavbar.propTypes = {
  value: PropTypes.string,
  data: PropTypes.array.isRequired,
  onItemClick: PropTypes.func,
  defaultKey: PropTypes.string,
}
HorizontalNavbar.defaultProps = {
  value: null,
  onItemClick: noop,
  defaultKey: null,
}

export default HorizontalNavbar
