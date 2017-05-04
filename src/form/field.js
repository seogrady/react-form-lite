import React from 'react'
import PropTypes from 'prop-types'
import { isFunction, isString, throttle } from 'lodash'
import FieldNode from './fieldNode'

export default class Field extends React.Component {
  static defaultProps = {
    value: ''
  }
  constructor(props) {
    super(props)
    this.state = { value: isString(props.value) ? props.value : '' }
    this.throttle = throttle((fn, ...args) => isFunction(fn) && fn(...args), 100)
  }
  componentWillReceiveProps({ value }) {
    if (this.state.value !== value) {
      this.setState({ value })
    }
  }
  onChange = value => {
    this.setState({ value })
    this.throttle(this.props.onChange, value)
  }
  render() {
    const { name, type, label, children } = this.props
    const { value } = this.state
    return (
      <div>
        {label && <label htmlFor={name}>{label}</label>}
        <FieldNode
          name={name}
          type={type}
          value={value}
          onChange={this.onChange}
        >{children}</FieldNode>
      </div>
    )
  }
}

Field.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  onChange: PropTypes.func
}
