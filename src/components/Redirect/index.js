import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

// eslint-disable-next-line no-unused-vars
const Workaround = ({ action, children }) => (action === 'REPLACE' ? null : children)

class Redirect extends React.Component {
  componentDidMount() {
    const { history, to } = this.props
    history.push(to)
  }

  render() {
    return <div />
  }
}
Redirect.propTypes = {
  to: PropTypes.string.isRequired,
  history: PropTypes.object,
}
Redirect.defaultProps = {
  history: {},
}

export default withRouter(Redirect)
