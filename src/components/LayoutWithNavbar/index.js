import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, useHistory } from 'react-router'
import get from 'lodash/get'

import HorizontalNavbar from '../HorizontalNavbar'

import styles from './style.module.scss'

const LayoutWithNavbar = ({ data, splitLocationValue }) => {
  const location = useLocation()
  const history = useHistory()
  const navbarValue = location.pathname.split('/')[splitLocationValue]
  const NavbarContent = get(
    data.find((item) => item.key === navbarValue),
    'component'
  )
  const handleNavbarItemClick = (key) => {
    const { to } = data.find((item) => item.key === key)
    history.push(to)
  }
  if (!navbarValue) {
    history.push(data[0].to)
    return null
  }
  return (
    <div className={styles.wrap}>
      <HorizontalNavbar value={navbarValue} data={data} onItemClick={handleNavbarItemClick} />
      {navbarValue && <NavbarContent />}
    </div>
  )
}

LayoutWithNavbar.propTypes = {
  data: PropTypes.array,
  splitLocationValue: PropTypes.number,
}
LayoutWithNavbar.defaultProps = {
  data: [],
  splitLocationValue: 2,
}

export default LayoutWithNavbar
