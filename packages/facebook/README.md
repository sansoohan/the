@the-/facebook
==========

<!---
This file is generated by the-tmpl. Do not update manually.
--->

<!-- Badge Start -->
<a name="badges"></a>

[![npm Version][bd_npm_shield_url]][bd_npm_url]

[bd_repo_url]: https://github.com/the-labo/the
[bd_travis_url]: http://travis-ci.org/the-labo/the
[bd_travis_shield_url]: http://img.shields.io/travis/the-labo/the.svg?style=flat
[bd_travis_com_url]: http://travis-ci.com/the-labo/the
[bd_travis_com_shield_url]: https://api.travis-ci.com/the-labo/the.svg?token=
[bd_license_url]: https://github.com/the-labo/the/blob/master/LICENSE
[bd_npm_url]: http://www.npmjs.org/package/@the-/facebook
[bd_npm_shield_url]: http://img.shields.io/npm/v/@the-/facebook.svg?style=flat
[bd_standard_url]: http://standardjs.com/
[bd_standard_shield_url]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Facebook utility for the-framework

<!-- Description End -->


<!-- Overview Start -->
<a name="overview"></a>




<!-- Overview End -->


<!-- Sections Start -->
<a name="sections"></a>

<!-- Section from "doc/readme/01.Installation.md.hbs" Start -->

<a name="section-doc-readme-01-installation-md"></a>

Installation
-----

```bash
$ npm install @the-/facebook --save
```


<!-- Section from "doc/readme/01.Installation.md.hbs" End -->

<!-- Section from "doc/readme/02.Usage.md.hbs" Start -->

<a name="section-doc-readme-02-usage-md"></a>

Usage
---------

```javascript
'use strict'

const theFacebook = require('@the-/facebook')

async function tryExample() {
  const fb = theFacebook({ apiVersion: 'v2.11' })

  const token = 'xxxxxxxxx' // user token
  const appToken = await fb.appTokenFor('__my_app_id__', '__my_app_secret__')
  const data = await fb.userDataFor(token, appToken, {
    fields: 'name,email,picture,timezone,gender,locale',
  })
}

tryExample().catch((err) => console.error(err))

```


<!-- Section from "doc/readme/02.Usage.md.hbs" End -->


<!-- Sections Start -->

<a name="api"></a>

## API Guide

### class
- [TheFacebook](./doc/api/api.md#TheFacebook)
### namespace
- [Constants](./doc/api/api.md#Constants)
### function
- [create(args)](./doc/api/api.md#create)

<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [MIT License](https://github.com/the-labo/the/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------

+ [THE Labo][the_labo_url]

[the_labo_url]: https://github.com/the-labo

<!-- Links End -->