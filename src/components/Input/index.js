import React, { Component } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

class Input extends Component {
  state = {
    value: '',
  }

  handleInputChange = ({ target: { value } }) => {
    const { onChange } = this.props
    this.setState({ value }, () => onChange(value))
  }

  render() {
    const { value } = this.state
    return <input value={value} onChange={this.handleInputChange} />
  }
}

Input.propTypes = {
  onChange: PropTypes.func,
}
Input.defaultProps = {
  onChange: noop,
}

export default Input
