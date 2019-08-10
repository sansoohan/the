/**
 * Inject script dynamically
 * @memberof module:@the-/util-dom
 * @function injectScript
 * @param {string} src
 * @param {Object} [options={}] - Optional settings
 * @returns {Promise}
 */
'use strict'

const { get } = require('@the-/window')

/** @lends module:@the-/util-dom.injectScript */
async function injectScript(src, options = {}) {
  const { target = 'head' } = options
  const document = get('document', { strict: true })
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.setAttribute('src', src)
    script.setAttribute('data-by', '@the-/util-dom.injectScript')
    script.setAttribute('class', 'the-dynamic-script')
    script.onload = () => resolve()
    script.onerror = (e) => reject(e)
    document[target].appendChild(script)
  })
}

module.exports = injectScript