import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { PlayerButton } from 'components'

const ThemedPlayerButton = ({ iconThemes: { activeTheme }, ...rest }) => {
  return <PlayerButton iconTheme={activeTheme} {...rest} />
}

ThemedPlayerButton.propTypes = {
  iconThemes: PropTypes.object.isRequired,
}

const mapStateToProps = ({ iconThemes }) => ({
  iconThemes,
})

export default connect(mapStateToProps)(ThemedPlayerButton)
