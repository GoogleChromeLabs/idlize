# `defineIdleProperties.mjs`

[`idlize/defineIdleProperties.mjs`](/defineIdleProperties.mjs)

## Overview

This module provides a `defineIdleProperties` helper function that allows developers to implement the [*idle-until-urgent*](https://philipwalton.com/articles/idle-until-urgent/) pattern in their code. It's useful when you want to initialize one or more property values during an idle period but ensure they can be initialized immediately as soon as they're referenced.

### Exports

- [`defineIdleProperties`](#defineidleproperties)

### Usage

```js
import {defineIdleProperties} from 'idlize/defineIdleProperties.mjs';

class MyClass {
  constructor() {
    // Define a getter for `this.data` whose value is initialized
    // in an idle callback (or immediately if referenced).
    defineIdleProperties(this, {
      data: () => {
        // Run expensive code and return the result...
      },
    });
  }
}
```

## `defineIdleProperties`

### Syntax

```js
defineIdleProperties(obj, props);
```

### Parameters

<table>
  <tr valign="top">
    <th align="left">Name</th>
    <th align="left">Type</th>
    <th align="left">Description</th>
  </tr>
  <tr valign="top" id="param-obj">
    <td><code>obj</code></td>
    <td><em>Object</em></td>
    <td>
      The object on which to define the property.
    </td>
  </tr>
  <tr valign="top" id="param-props">
    <td><code>props</code></td>
    <td><em>Object</em></td>
    <td>
      A dictionary of property names and initialization functions. See the <code>defineIdleProperty</code> documentation for <a href="/docs/defineIdleProperty.md#param-prop"><code>prop</code></a> and <a href="/docs/defineIdleProperty.md#param-prop"><code>init</code></a>.
    </td>
  </tr>
</table>
