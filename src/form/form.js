import React from 'react'
import PropTypes from 'prop-types'
import { isEqual, isFunction, isObject, throttle } from 'lodash'
import Field from './field'
import { getModel, setModel } from './utils'

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = { model: isObject(props.model) ? props.model : {} }
    this.throttle = throttle((fn, ...args) => isFunction(fn) && fn(...args), 100)
  }
  componentWillReceiveProps({ model }) {
    if (!isEqual(this.state.model, model)) {
      this.setState({ model })
    }
  }
  onChange = (path, value) => {
    const model = setModel(path, value, this.state.model)
    this.setState({ model })
    this.throttle(this.props.onChange, model)
  }
  onSubmit = e => {
    e.preventDefault()
    const { onSubmit } = this.props
    if (isFunction(onSubmit)) {
      onSubmit(this.state.model)
    }
  }
  render() {
    const { children } = this.props
    const { model } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        {React.Children.map(children, child => {
          if (child.type === Field) {
            const v = getModel(child.props.name, model)
            return React.cloneElement(child, {
              ...child.props,
              ...(v && { value: v }),
              onChange: value => this.onChange(child.props.name, value)
            })
          }
          return child
        })}
      </form>
    )
  }
}

Form.propTypes = {
  model: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
}
