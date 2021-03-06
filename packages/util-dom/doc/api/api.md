<!--- Code generated by @the-/script-doc. DO NOT EDIT. -->

<a name="module_@the-/util-dom"></a>

## @the-/util-dom
Dom utility for the-framework

**Version**: 15.5.2  
**License**: MIT  

* [@the-/util-dom](#module_@the-/util-dom)
    * [.byId(id)](#module_@the-/util-dom.byId) ⇒ <code>HTMLElement</code>
        * [.withRetry(id, [options])](#module_@the-/util-dom.byId.withRetry) ⇒ <code>Promise.&lt;?HTMLElement&gt;</code>
    * [.injectScript(src, [options])](#module_@the-/util-dom.injectScript) ⇒ <code>Promise</code>

<a name="module_@the-/util-dom.byId"></a>

### utilDom.byId(id) ⇒ <code>HTMLElement</code>
Get element by id

**Kind**: static method of [<code>@the-/util-dom</code>](#module_@the-/util-dom)  
**Returns**: <code>HTMLElement</code> - - Found element  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of dom element |

<a name="module_@the-/util-dom.byId.withRetry"></a>

#### byId.withRetry(id, [options]) ⇒ <code>Promise.&lt;?HTMLElement&gt;</code>
Get element by id

**Kind**: static method of [<code>byId</code>](#module_@the-/util-dom.byId)  
**Returns**: <code>Promise.&lt;?HTMLElement&gt;</code> - - Found element  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Id of dom element |
| [options] | <code>Object</code> | <code>{}</code> | Optional settings |

<a name="module_@the-/util-dom.injectScript"></a>

### utilDom.injectScript(src, [options]) ⇒ <code>Promise</code>
Inject script dynamically

**Kind**: static method of [<code>@the-/util-dom</code>](#module_@the-/util-dom)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| src | <code>string</code> |  |  |
| [options] | <code>Object</code> | <code>{}</code> | Optional settings |

