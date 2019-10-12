'use strict'

import c from 'classnames'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

/**
 * Demo of the-components
 * @memberof module:@the-/demo-ui
 * @class TheDemoUi
 * @augments React.Component
 */
class TheDemoUi extends React.Component {
  render() {
    const {
      props,
      props: { children, className },
    } = this

    return (
      <div
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-demo-ui', className)}
      >
        {children}
      </div>
    )
  }
}

TheDemoUi.propTypes = {}

TheDemoUi.defaultProps = {}

TheDemoUi.displayName = 'TheDemoUi'

export default TheDemoUi
