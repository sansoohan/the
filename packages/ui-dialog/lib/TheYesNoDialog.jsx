'use strict'

import { clone } from 'asobj'
import PropTypes from 'prop-types'
import React from 'react'
import TheDialog from './TheDialog'

/**
 * Yes No Dialog
 */
const TheYesNoDialog = (props) => {
  const { noText, onNo, onYes, yesText } = props

  const dialogProps = clone(props, {
    except: ['onYes', 'onNo', 'yesText', 'noText'],
  })

  const footer = (
    <div className='the-yes-no-dialog-control'>
      <TheYesNoDialog.Button onClick={onNo} text={noText} />
      <TheYesNoDialog.Button onClick={onYes} text={yesText} />
    </div>
  )

  return <TheDialog {...dialogProps} footer={footer} />
}

TheYesNoDialog.Button = function Button({ onClick, text }) {
  return (
    <a className='the-yes-no-dialog-button' onClick={onClick} role='button'>
      <span className='the-yes-no-dialog-button-text'>{text}</span>
    </a>
  )
}

TheYesNoDialog.propTypes = {
  /** Shows the dialog */
  /** Text of NO button */
  noText: PropTypes.string,
  /** Close handler */
  onClose: PropTypes.func,
  /** Handler for tapping NO */
  onNo: PropTypes.func,
  /** Handler for tapping YES */
  onYes: PropTypes.func,
  present: PropTypes.bool.isRequired,
  /** Show spin */
  spinning: PropTypes.bool,
  /** Dialog Title */
  title: PropTypes.string,
  /** Text of YES button */
  yesText: PropTypes.string,
}

TheYesNoDialog.defaultProps = {
  noText: 'No',
  onClose: () => null,
  onNo: null,
  onYes: null,
  present: false,
  spinning: false,
  title: null,
  yesText: 'Yes',
}

TheYesNoDialog.displayName = 'TheYesNoDialog'

export default TheYesNoDialog
