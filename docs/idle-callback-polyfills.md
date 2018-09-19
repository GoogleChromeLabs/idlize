# `idle-callback-polyfills.mjs`

[`idlize/idle-callback-polyfills.mjs`](/idle-callback-polyfills.mjs)

## Overview

Small polyfills that allow developers to use [`requestIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) and [`cancelIdleCallback()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelIdleCallback) in all browsers.

These are not full polyfills (since the native APIs cannot be fully polyfilled), but they offer the basic benefits of idle tasks via `setTimeout()` and `clearTimeout()`.

### Exports

- [`rIC`](#rIC)
- [`cIC`](#cIC)

### Usage

```js
import {rIC, cIC} from 'idlize/idle-callback-polyfills.mjs';

// To run a task when idle.
const handle = rIC(() => {
  // Do something here...
});

// To cancel the idle callback.
cIC(handle);
```

## `rIC`

Uses the native `requestIdleCallback()` function in browsers that support it, or a small polyfill (based on `setTimeout()`) in browsers that don't.

See the [`requestIdleCallback()` docs on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) for details.

## `cIC`

Uses the native `cancelIdleCallback()` function in browsers that support it, or a small polyfill (based on `clearTimeout()`) in browsers that don't.

See the [`cancelIdleCallback()` docs on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelIdleCallback) for details.
