import React from 'react'
import PropTypes from 'prop-types'

export default function FieldNode({ name, type, value, children, onChange }) {
  switch (type) {
    case 'select':
      return (
        <select
          name={name}
          value={value}
          onChange={({ target: { value: v } }) => onChange(v)}
        >{children}</select>
      )
    case 'textarea':
      return (
        <textarea
          name={name}
          value={value}
          onChange={({ target: { value: v } }) => onChange(v)}
        />
      )
    case 'text':
    case 'email':
    case 'number':
    default:
      return (
        <input
          name={name}
          type={type || 'text'}
          value={value}
          onChange={({ target: { value: v } }) => onChange(v)}
        />
      )
  }
}

FieldNode.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  onChange: PropTypes.func
}
