import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

const FontAwesome5 = {}
const styles = {}
const playerButtonSizes = {
  xxs: 30,
  xs: 40,
  s: 50,
  m: 60,
  l: 70,
  xl: 80,
  xxl: 90,
}

const PlayerButton = ({ iconName, iconStyle, iconColor, iconSize, children, style, disabled, onPress }) => {
  const buttonHeight = playerButtonSizes[iconSize]
  const buttonWidth = playerButtonSizes[iconSize]
  const currentIconSize = playerButtonSizes[iconSize] - 10
  return (
    <button
      type="button"
      disabled={disabled}
      style={[styles.wrap, { height: buttonHeight, width: buttonWidth }, style]}
      onPress={onPress}
    >
      {iconName ? <FontAwesome5 color={iconColor} style={iconStyle} name={iconName} size={currentIconSize} /> : children}
    </button>
  )
}

PlayerButton.propTypes = {
  disabled: PropTypes.bool,
  iconName: PropTypes.string,
  iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  iconSize: PropTypes.oneOf(Object.keys(playerButtonSizes)),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.any,
  onPress: PropTypes.func,
}
PlayerButton.defaultProps = {
  disabled: false,
  iconName: null,
  iconStyle: {},
  iconSize: 's',
  style: {},
  children: null,
  onPress: noop,
}

export default PlayerButton
