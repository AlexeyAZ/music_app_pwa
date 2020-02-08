import styled from 'styled-components'

import Box from '../Box'

const SimpleButton = styled(Box)`
  transition: 0.3s ease;
  outline: none;
  &:active {
    opacity: 0.6;
  }
`

SimpleButton.defaultProps = {
  as: 'button',
  type: 'button',
  backgroundColor: 'transparent',
  backgroundImage: 'none',
  border: 'none',
  px: 0,
}

export default SimpleButton
