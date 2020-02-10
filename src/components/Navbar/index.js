import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from './styles.module.scss'

const Navbar = ({ data }) => {
  return (
    <div className={styles.wrap}>
      {data.map(({ href, label }) => (
        <div key={href}>
          <Link to={href}>{label}</Link>
        </div>
      ))}
    </div>
  )
}

Navbar.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Navbar
