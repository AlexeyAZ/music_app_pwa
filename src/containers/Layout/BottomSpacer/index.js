import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { trackIdSelector } from 'modules/playbackStatus'

import styles from './styles.module.scss'

const BottomSpacer = ({ trackId }) => {
  if (trackId) {
    return <div className={styles.layoutBottomSpacer} />
  }
  return null
}

BottomSpacer.propTypes = {
  trackId: PropTypes.string,
}
BottomSpacer.defaultProps = {
  trackId: null,
}

const mapStateToProps = state => ({
  trackId: trackIdSelector(state),
})

export default connect(mapStateToProps)(BottomSpacer)
