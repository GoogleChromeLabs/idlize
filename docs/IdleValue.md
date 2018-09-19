# `IdleValue.mjs`

[`idlize/IdleValue.mjs`](/IdleValue.mjs)

## Overview

The `IdleValue` class is a helper that allows developers to implement the [*idle-until-urgent*](https://philipwalton.com/articles/idle-until-urgent/) pattern in their code. It's useful when you want to initialize a value during an idle period but ensure it can be initialized immediately as soon as it's needed.

### Exports

- [`IdleValue`](#idlevalue)

### Usage

```js
import {IdleValue} from 'idlize/IdleValue.mjs';

class MyClass {
  constructor() {
    // Create an IdleValue instance for `this.data`. It's value is
    // initialized in an idle callback (or immediately as soon as
    // `this.data.getValue()` is called).
    this.data = new IdleValue(() => {
      // Run expensive code and return the result...
    });
  }
}
```

## `IdleValue`

### Methods

<table>
  <tr valign="top">
    <th align="left">Name</th>
    <th align="left">Description</th>
  </tr>
  <tr valign="top" id="param-constructor">
    <td><code>constructor(init)</code></td>
    <td>
      <p><strong>Parameters:</strong></p>
      <ul>
        <li>
          <code>init</code> <emn>(Function)</em>
          An initialization function (typically something expensive to compute) that returns a value.
        </li>
      </ul>
      <p>The initialization function is scheduled to run in an idle callback as soon as the instance is created.</p>
    </td>
  </tr>
  <tr valign="top" id="param-getValue">
    <td><code>getValue()</code></td>
    <td>
      <p><strong>Returns:</strong> <em>(*)</em></p>
      <p>Returns the value returned by the initialization function passed to the constructor. If the initialization function has already been run, the value is returned immediately. If the initialization function is still scheduled for an idle callback, that callback is cancelled, the initialization function is run synchronously, and the result is returned.</p>
    </td>
  </tr>
  <tr valign="top" id="param-setValue">
    <td><code>setValue(newValue)</code></td>
    <td>
      <p><strong>Parameters:</strong></p>
      <ul>
        <li>
          <code>newValue</code> <em>(*)</em>
        </li>
      </ul>
      <p>Assigns a new value. If the initialization function passed to the constructor has not yet run, it is cancelled.</p>
    </td>
  </tr>
</table>

