import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from '@xstyled/styled-components'
import { variant } from '@xstyled/system'

const buttonVariants = variant({
  default: 'primary',
  variants: {
    primary: css`
      color: primary;
    `,
    secondary: css`
      color: green;
    `
  }
})

const Button = styled.button`
  ${buttonVariants};
  /* background-color: primary; */
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

Button.propTypes = {
  
}

export default Button