@the-/db
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
[bd_npm_url]: http://www.npmjs.org/package/@the-/db
[bd_npm_shield_url]: http://img.shields.io/npm/v/@the-/db.svg?style=flat
[bd_standard_url]: http://standardjs.com/
[bd_standard_shield_url]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

DB for the-framework

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
$ npm install @the-/db --save
```


<!-- Section from "doc/readme/01.Installation.md.hbs" End -->

<!-- Section from "doc/readme/02.Usage.md.hbs" Start -->

<a name="section-doc-readme-02-usage-md"></a>

Usage
---------

```javascript
'use strict'

const {
  DataTypes: { STRING },
  TheResource,
} = require('@the-/resource')
const { TheDB } = require('@the-/db')

// Define a resource class
// See https://github.com/realglobe-Inc/clay-resource for more detail
class UserResource extends TheResource {
  // Create index to enable filter/sort with nested attributes
  static get indices() {
    return ['profile.name', 'profile.email']
  }

  // Resource policy
  // https://github.com/realglobe-Inc/clay-policy#usage
  static get policy() {
    return {
      password: { type: STRING },
      username: { type: STRING },
    }
  }

  // Enhance entity class
  static entityClass(ResourceEntity) {
    return class UserResourceEntity extends ResourceEntity {
      get fullName() {
        let { firstName, lastName } = this
        return [firstName, lastName].filter(Boolean).join(' ')
      }
    }
  }

  // Convert entity attributes on inbound
  static inbound(attributes) {
    const digest = () => {
      /* ... */
    }
    attributes.passwordHash = digest(attributes.password)
    return attributes
  }

  // Hook after entity create
  static onCreate(created) {
    console.log('Entity created:', created)
  }

  // Hook after entity destroy
  static onDestroyed(destroyed) {
    console.log('Entity destroyed:', destroyed)
  }

  // Hook after entity update
  static onUpdate(updated) {
    console.log('Entity updated:', updated)
  }

  // Convert entity attributes on outbound
  static outbound(attributes) {
    delete attributes.password
    return attributes
  }
}

const db = new TheDB({
  dialect: 'sqlite', // Uses "clay-driver-sqlite" package
  storage: 'var/my-app.db', // File path to save
})

db.load(UserResource, 'User')

// Using defined database

async function tryExample() {
  // Use the connected resource
  const { User } = db.resources
  let user = await User.create({
    password: 'Super Cool',
    username: 'Black Fire',
  })
  /* ... */
}

tryExample().catch((err) => console.error(err))

```


<!-- Section from "doc/readme/02.Usage.md.hbs" End -->

<!-- Section from "doc/readme/03.API.md.hbs" Start -->

<a name="section-doc-readme-03-api-md"></a>

## API Guide

- [default](./doc/api/api.md#module_default)
- [@the-/db](./doc/api/api.md#module_@the-/db)
- [helpers](./doc/api/api.md#module_helpers)
- [mixins](./doc/api/api.md#module_mixins)
- [resources](./doc/api/api.md#module_resources)


<!-- Section from "doc/readme/03.API.md.hbs" End -->


<!-- Sections Start -->


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