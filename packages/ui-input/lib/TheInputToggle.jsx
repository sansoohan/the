'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor, newId } from '@the-/util-ui'

/**
 * Toggle input of the-components
 */
class TheInputToggle extends React.PureComponent {
  static Label({ className, htmlFor, title }) {
    return (
      <label
        className={c('the-input-toggle-label', className)}
        htmlFor={htmlFor}
      >
        <span className='the-input-toggle-label-text'>{title}</span>
      </label>
    )
  }

  static Radio({ checked, id, name, onChange, onClick, value }) {
    return (
      <input
        checked={checked}
        className='the-input-toggle-radio'
        id={id}
        name={name}
        onChange={onChange}
        onClick={onClick}
        type='radio'
        value={value}
      />
    )
  }

  constructor(props) {
    super(props)
    this.id = newId()
  }

  handleChange(e) {
    const {
      props: { onChange },
    } = this
    onChange && onChange(e)
  }

  handleClick(e) {
    const {
      props: { name, on, onUpdate },
    } = this
    onUpdate && onUpdate({ [name]: !on })
  }

  render() {
    const { props } = this
    const {
      className,
      error,
      id = this.id,
      name,
      offTitle,
      on,
      onTitle,
      style,
      width,
    } = props
    const { Label, Radio } = TheInputToggle
    return (
      <div
        {...htmlAttributesFor(props, { except: ['id', 'className'] })}
        {...eventHandlersFor(props, { except: [] })}
        aria-checked={on}
        className={c('the-input-toggle', className, {
          'the-input-error': !!error,
          'the-input-toggle-off': !on,
          'the-input-toggle-on': on,
        })}
        id={id}
        role='switch'
        style={Object.assign({}, style, { width })}
      >
        <div className='the-input-toggle-inner'>
          <Label
            className='the-input-toggle-on-label'
            htmlFor={`${id}-radio-off`}
            title={onTitle}
          />
          <Radio
            checked={!on}
            id={`${id}-radio-off`}
            name={name}
            onChange={(e) => this.handleChange(e)}
            onClick={(e) => this.handleClick(e)}
            value='off'
          />
          <div
            className='the-input-toggle-handle'
            onClick={(e) => this.handleClick(e)}
          />
          <Label
            className='the-input-toggle-off-label'
            htmlFor={`${id}-radio-on`}
            title={offTitle}
          />
          <Radio
            checked={!!on}
            id={`${id}-radio-on`}
            name={name}
            onChange={(e) => this.handleChange(e)}
            onClick={(e) => this.handleClick(e)}
            value='on'
          />
        </div>
        {props.children}
      </div>
    )
  }
}

TheInputToggle.propTypes = {
  /** Title text for off state */
  offTitle: PropTypes.string,
  /** Switch on or not */
  on: PropTypes.bool.isRequired,
  /** Title text for on state */
  onTitle: PropTypes.string,
  /** Width of component */
  width: PropTypes.number,
}

TheInputToggle.defaultProps = {
  error: null,
  offTitle: '',
  on: false,
  onTitle: '',
  width: 64,
}

TheInputToggle.displayName = 'TheInputToggle'

export default TheInputToggle
