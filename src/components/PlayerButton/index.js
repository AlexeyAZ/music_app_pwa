import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import cn from 'classnames'

import SimpleButton from '../SimpleButton'
import Icon from '../Icon'

import styles from './styles.module.scss'

const PlayerButton = ({
  className,
  iconTheme,
  iconName,
  iconColor,
  iconSize,
  children,
  disabled,
  onClick,
}) => {
  return (
    <SimpleButton disabled={disabled} onClick={onClick} className={className}>
      {iconName ? (
        <Icon
          className={cn(
            styles[`icon-${iconSize}`],
            disabled ? styles[`color-disabled`] : styles[`color-${iconColor}`]
          )}
          iconTheme={iconTheme}
          iconName={iconName}
        />
      ) : (
        children
      )}
    </SimpleButton>
  )
}

PlayerButton.propTypes = {
  className: PropTypes.string,
  iconTheme: PropTypes.string,
  iconColor: PropTypes.string,
  disabled: PropTypes.bool,
  iconName: PropTypes.string,
  iconSize: PropTypes.string,
  children: PropTypes.any,
  onClick: PropTypes.func,
}
PlayerButton.defaultProps = {
  className: '',
  iconTheme: 'material',
  iconColor: 'black',
  disabled: false,
  iconName: null,
  iconSize: 's',
  children: null,
  onClick: noop,
}

export default PlayerButton
