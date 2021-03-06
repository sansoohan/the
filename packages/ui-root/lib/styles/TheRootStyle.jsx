'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheRoot */
const TheRootStyle = ({ className, id, options }) => (
  <TheStyle
    className={c('the-root-style', className)}
    id={id}
    styles={TheRootStyle.data(options)}
  />
)

TheRootStyle.displayName = 'TheRootStyle'
TheRootStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheRootStyle.defaultProps = {
  options: {},
}

TheRootStyle.data = () =>
  Object.assign(
    {},
    asStyleData({
      '.the-root': {
        alignItems: 'stretch',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
      },
    }),
  )

export default TheRootStyle
