import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { Link } from 'react-router-dom'
import get from 'lodash/get'

import { Button } from 'components'

import * as GenresModule from 'modules/genres'
import * as ModalModule from 'modules/modal'

import { getCurrentApi, axiosInstance } from 'helpers'

const { apiName } = getCurrentApi()

const { Napster } = window

class Genres extends Component {
  componentDidMount() {
    const { getAllGenres } = this.props

    if (apiName === 'NAPSTER') {
      getAllGenres()
    } else {
      axiosInstance.get('/me').then(res => console.log(res))
    }
  }

  playTrack = () => {
    Napster.player.play('Tra.5156528')
  }

  stopTrack = () => {
    Napster.player.pause()
  }

  render() {
    const { allGenres } = this.props
    const allGenresData = get(allGenres, 'data.genres', [])
    return (
      <div>
        {allGenresData.map(genre => {
          return <div key={genre.id}>{genre.name}</div>
        })}
        <Button onClick={this.playTrack}>Play</Button>
        <Button onClick={this.stopTrack}>Stop</Button>
        <Link to="/main">To main</Link>
      </div>
    )
  }
}

Genres.propTypes = {
  authOptions: PropTypes.object.isRequired,
  allGenres: PropTypes.object.isRequired,
  getAllGenres: PropTypes.func.isRequired,
}

const mapStateToProps = ({ authOptions, playbackStatus, allGenres }) => ({
  authOptions,
  playbackStatus,
  allGenres,
})

const mapDispatchToProps = dispatch => ({
  getAllGenres: bindActionCreators(GenresModule.getAllGenres, dispatch),
  openModal: bindActionCreators(ModalModule.openModal, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Genres)
