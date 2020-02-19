import React from 'react'
import PropTypes from 'prop-types'

import { getNapsterImage } from 'helpers'

const NapsterImage = ({ type, id, size, className }) => {
  return <img className={className} src={getNapsterImage({ type, id, size })} alt="" />
}

NapsterImage.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  size: PropTypes.string,
}
NapsterImage.defaultProps = {
  className: '',
  size: 'xs',
}

export default NapsterImage
