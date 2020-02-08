import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { SimplePlayerButton } from 'components'

const ThemedPlayerButton = ({ iconThemes: { activeTheme }, ...rest }) => {
  return <SimplePlayerButton iconTheme={activeTheme} {...rest} />
}

ThemedPlayerButton.propTypes = {
  iconThemes: PropTypes.object.isRequired,
}

const mapStateToProps = ({ iconThemes }) => ({
  iconThemes,
})

export default connect(mapStateToProps)(ThemedPlayerButton)
