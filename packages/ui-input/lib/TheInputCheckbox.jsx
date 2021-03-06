'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'
import { TheIcon } from '@the-/ui-icon'
import { eventHandlersFor, htmlAttributesFor, newId } from '@the-/util-ui'
import {
  normalizeArrayValue,
  normalizeOptions,
  renderErrorMessage,
} from './helpers'

/**
 * Checkbox input of the-components
 */
const TheInputCheckbox = React.memo((props) => {
  const {
    asButton,
    className,
    disabledValues,
    error,
    name,
    onChange,
    onUpdate,
    parser,
    readOnly,
    splitter,
    tabIndex,
  } = props
  const id = useMemo(() => props.id || newId(), [props.id])

  const handleToggle = useCallback(
    (changedValue, checked, e) => {
      let valueArray = normalizeArrayValue(props.value, splitter).map((value) =>
        String(value).trim(),
      )
      const has = valueArray.includes(changedValue)
      if (has && !checked) {
        valueArray = valueArray.filter((value) => value !== changedValue)
      }

      if (!has && checked) {
        valueArray.push(changedValue)
      }

      onChange && onChange(e)
      onUpdate &&
        onUpdate({
          [name]: parser(valueArray),
        })
    },
    [name, props.value, splitter, onUpdate, onChange, parser],
  )

  const idFor = useCallback(
    (optionValue) => [id, ...[].concat(optionValue)].join('-'),
    [id],
  )

  const options = useMemo(() => normalizeOptions(props.options), [
    props.options,
  ])
  const value = useMemo(
    () =>
      normalizeArrayValue(props.value, splitter).map((value) =>
        String(value).trim(),
      ),
    [props.value],
  )

  return (
    <div
      {...htmlAttributesFor(props, {
        except: ['id', 'className', 'tabIndex', 'value'],
      })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-input-checkbox', className, {
        'the-input-checkbox-as-button': asButton,
        'the-input-error': !!error,
      })}
      data-value={value}
      id={id}
    >
      {renderErrorMessage(error)}
      <div className={c('the-input-checkbox-inner')}>
        {readOnly ? (
          <span className='the-input-checkbox-readonly'>{options[value]}</span>
        ) : (
          Object.keys(options).map((optionValue) => {
            const checked = optionValue
              .split(splitter)
              .some((optionValue) => value.includes(String(optionValue).trim()))
            return (
              <TheInputCheckbox.Option
                checked={checked}
                disabled={disabledValues.includes(optionValue)}
                id={idFor(optionValue)}
                key={optionValue}
                label={options[optionValue]}
                name={name}
                onToggle={handleToggle}
                tabIndex={tabIndex}
                value={optionValue}
              />
            )
          })
        )}
      </div>
    </div>
  )
})

TheInputCheckbox.Option = function TheInputCheckboxOption({
  checked,
  disabled,
  id,
  label,
  name,
  onToggle,
  tabIndex = 0,
  value,
}) {
  const icon = checked
    ? TheInputCheckbox.CHECKED_ICON
    : TheInputCheckbox.NORMAL_ICON
  const handleChange = useCallback(
    (e) => {
      const {
        target: { checked },
      } = e
      const changedValue = String(e.target.value).trim()
      onToggle(changedValue, checked, e)
    },
    [onToggle],
  )
  const handleKeyDown = useCallback(
    (e) => {
      const isSpace = e.keyCode === 32
      if (isSpace) {
        const changedValue = String(value).trim()
        onToggle(changedValue, !checked, e)
        e.stopPropagation()
        e.preventDefault()
      }
    },
    [onToggle, checked],
  )
  return (
    <div
      aria-checked={checked}
      aria-label={label}
      className={c('the-input-checkbox-item', {
        'the-input-checkbox-item-checked': checked,
        'the-input-checkbox-item-disabled': disabled,
      })}
      data-value={value}
      key={value}
      role='checkbox'
    >
      <input
        checked={checked}
        className='the-input-checkbox-checkbox'
        disabled={disabled}
        id={id}
        name={name}
        onChange={handleChange}
        tabIndex={-1}
        type='checkbox'
        value={value}
      />
      <label
        className='the-input-checkbox-label'
        htmlFor={id}
        onKeyDown={handleKeyDown}
        tabIndex={tabIndex}
      >
        <TheIcon className={c('the-input-checkbox-icon', icon)} />
        {label}
      </label>
    </div>
  )
}

TheInputCheckbox.Boolean = React.memo(function TheInputCheckboxBoolean(props) {
  const { label, name, value, ...otherProps } = props
  const handleUpdate = useCallback(
    (updated) => {
      props.onUpdate &&
        props.onUpdate({
          [name]: updated[name] === label,
        })
    },
    [name, props.onUpdate],
  )
  return (
    <TheInputCheckbox
      {...otherProps}
      name={name}
      onUpdate={handleUpdate}
      options={[label]}
      value={value ? label : ''}
    />
  )
})

TheInputCheckbox.NORMAL_ICON = 'far fa-square'
TheInputCheckbox.CHECKED_ICON = 'fas fa-check-square'

TheInputCheckbox.propTypes = {
  /** Name of input */
  /** Error message */
  /** Disabled values */
  disabledValues: PropTypes.array,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  name: PropTypes.string.isRequired,
  /** Handle for update */
  onUpdate: PropTypes.func.isRequired,
  /** Options */
  options: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.bool),
  ]),
  /** Value parser */
  parser: PropTypes.func,
  /** Value Splitter text */
  splitter: PropTypes.string,
  /** Value of input */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

TheInputCheckbox.defaultProps = {
  disabledValues: [],
  error: null,
  options: {},
  parser: String,
  splitter: ',',
  value: '',
}

TheInputCheckbox.displayName = 'TheInputCheckbox'

export default TheInputCheckbox
