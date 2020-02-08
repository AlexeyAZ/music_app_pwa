import React from 'react'
import PropTypes from 'prop-types'

import iconThemes from './iconThemes'

const Icon = ({ iconTheme, iconName, ...rest }) => {
  const IconComponent = iconThemes[`${iconTheme}${iconName}`]
  return <IconComponent {...rest} />
}

Icon.propTypes = {
  iconTheme: PropTypes.oneOf(['material', 'feather']),
  iconName: PropTypes.string.isRequired,
}
Icon.defaultProps = {
  iconTheme: 'feather',
}

export default Icon
