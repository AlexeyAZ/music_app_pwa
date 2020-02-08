import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import styled from 'styled-components'
import { system } from 'styled-system'

import SimpleButton from '../SimpleButton'
import Icon from '../Icon'

const PlayerButton = styled(SimpleButton)`
  ${system({
    iconSize: {
      properties: ['height', 'width'],
      scale: 'iconSizes',
    },
  })}
`

const PlayerIcon = styled(Icon)`
  ${system({
    iconSize: {
      properties: ['height', 'width'],
      scale: 'iconSizes',
      transform: (value, scale) => {
        return scale[value] - 10
      },
    },
  })}
`

const SimplePlayerButton = ({
  iconTheme,
  iconName,
  iconColor,
  iconSize,
  children,
  disabled,
  onClick,
}) => {
  return (
    <PlayerButton iconSize={iconSize} disabled={disabled} onClick={onClick}>
      {iconName ? (
        <PlayerIcon
          iconTheme={iconTheme}
          iconSize={iconSize}
          iconName={iconName}
          color={iconColor}
          name={iconName}
        />
      ) : (
        children
      )}
    </PlayerButton>
  )
}

SimplePlayerButton.propTypes = {
  iconTheme: PropTypes.string,
  iconColor: PropTypes.string,
  disabled: PropTypes.bool,
  iconName: PropTypes.string,
  iconSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.any,
  onClick: PropTypes.func,
}
SimplePlayerButton.defaultProps = {
  iconTheme: 'material',
  iconColor: 'black',
  disabled: false,
  iconName: null,
  iconSize: 's',
  children: null,
  onClick: noop,
}

export default SimplePlayerButton
