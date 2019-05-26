'use strict'

import React from 'react'
import { ThePager, ThePagerStyle } from '@the-/ui-pager'

class ExampleComponent extends React.PureComponent {
  constructor(props) {
    super(props)
    const s = this
    s.state = { page: 2 }
  }

  render() {
    const s = this
    const { state } = s
    return (
      <div>
        <ThePagerStyle />
        <ThePager.Row>
          <ThePager
            onChange={(e) => s.setState({ page: e.page })}
            page={state.page}
            size={3}
            total={8}
          />
          <ThePager.Counts counts={{ limit: 25, offset: 25, total: 52 }} />
        </ThePager.Row>

        <hr />

        <ThePager
          hrefPattern='?page=:page'
          page={state.page}
          size={5}
          total={15}
        />
      </div>
    )
  }
}

export default ExampleComponent
