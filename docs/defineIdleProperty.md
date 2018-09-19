# `defineIdleProperty.mjs`

[`idlize/defineIdleProperty.mjs`](/defineIdleProperty.mjs)

## Overview

The module provides a `defineIdleProperty` helper function that allows developers to implement the [*idle-until-urgent*](https://philipwalton.com/articles/idle-until-urgent/) pattern in their code. It's useful when you want to initialize a property value during an idle period but ensure it can be initialized immediately as soon as it's referenced.

### Exports

- [`defineIdleProperty`](#defineidleproperty)

### Usage

```js
import {defineIdleProperty} from 'idlize/defineIdleProperty.mjs';

class MyClass {
  constructor() {
    // Define a getter for `this.data` whose value is initialized
    // in an idle callback (or immediately if referenced).
    defineIdleProperty(this, 'data', () => {
      // Run expensive code and return the result...
    });
  }
}
```

## `defineIdleProperty`

### Syntax

```js
defineIdleProperty(obj, prop, init);
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
  <tr valign="top" id="param-prop">
    <td><code>prop</code></td>
    <td><em>string</em></td>
    <td>
      The name of the property.
    </td>
  </tr>
  <tr valign="top" id="param-init">
    <td><code>init</code></td>
    <td><em>Function</em></td>
    <td>
      An function (typically something expensive to compute) that returns a value. The function is scheduled to run in an idle callback as soon as the property is defined. If the property is referenced before the function can be run in an idle callback, the idle callback is canceled, the function is run immediately, and the return value of the function is set as the value of the property.
    </td>
  </tr>
</table>
