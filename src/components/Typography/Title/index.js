import React from 'react'

import Text from '../Text'

const Title = ({ ...rest }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Text {...rest} weight="bold" />
  )
}

export default Title
