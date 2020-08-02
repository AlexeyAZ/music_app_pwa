import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Text } from 'components'
import ThemedPlayerButton from '../../ThemedPlayerButton'

import styles from './styles.module.scss'

const Navbar = ({ data }) => {
  return (
    <div className={styles.wrap}>
      {data.map(({ href, label, iconName }) => (
        <Link to={href} className={styles.navbarItem} key={href}>
          <ThemedPlayerButton iconSize="s" iconName={iconName} />
          <Text size="xs">{label}</Text>
        </Link>
      ))}
    </div>
  )
}

Navbar.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Navbar
