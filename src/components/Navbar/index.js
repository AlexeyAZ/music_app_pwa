import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Box from '../Box'

const Navbar = ({ data }) => {
  return (
    <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(20px, 1fr))">
      {data.map(({ href, label }) => (
        <Box key={href}>
          <Link to={href}>{label}</Link>
        </Box>
      ))}
    </Box>
  )
}

Navbar.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Navbar
