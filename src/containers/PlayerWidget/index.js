import React from 'react'
import PropTypes from 'prop-types'

import { Box } from 'components'

import PlayButton from '../PlayButton'
import SkipNextButton from '../SkipNextButton'
import SkipPreviousButton from '../SkipPreviousButton'
import PlayerSeekBar from '../PlayerSeekBar'

const PlayerWidget = props => {
  return (
    <Box>
      <Box>
        <SkipPreviousButton />
        <PlayButton />
        <SkipNextButton />
      </Box>
      <Box>
        <PlayerSeekBar />
      </Box>
    </Box>
  )
}

PlayerWidget.propTypes = {}

export default PlayerWidget
