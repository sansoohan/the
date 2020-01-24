'use strict'

import c from 'classnames'
import TheMenuItem from '../TheMenuItem'

export default function TheDropDownMenuItem(props) {
  const { className } = props
  return (
    <TheMenuItem
      {...props}
      className={c('the-dropdown-menu-item', className)}
      role='menuitem'
    />
  )
}
