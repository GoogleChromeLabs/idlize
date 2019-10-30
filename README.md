# Idlize

Helper classes and methods make it easier for developers to implement the [*idle-until-urgent*](https://philipwalton.com/articles/idle-until-urgent/) pattern and leverage the [`requestIdleCallback()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) API.

## Installation

You can install this library from npm by running:

```sh
npm install idlize
```

### Polyfills

`requestIdleCallback` and `cancelIdleCallback` are not available in all browsers. If you would like to support older browsers,
you will need to include a polyfill. For example, you may consider the following:

- [A simpler and lighter requestidlecallback-polyfill library](https://github.com/pladaria/requestidlecallback-polyfill)
- [A more robust, but heavier, requestIdleCallback library](https://www.npmjs.com/package/requestidlecallback)

## Usage

This library is a collection of helper methods and classes (not a single bundle). As such, each helper should be imported separately. All public helpers are released at the level of the project, so they can be imported by directly referencing the helper's `.mjs` file.

```js
import {defineIdleProperty} from 'idlize/defineIdleProperty.mjs'
import {defineIdleProperties} from 'idlize/defineIdleProperties.mjs'
import {cIC, rIC} from 'idlize/idle-callback-polyfills.mjs'
import {IdleQueue} from 'idlize/IdleQueue.mjs'
import {IdleValue} from 'idlize/IdleValue.mjs'
```

Refer to each helper's [documentation](/docs) for examples and API usage details:

- [`defineIdleProperty.mjs`](/docs/defineIdleProperty.md)
- [`defineIdleProperties.mjs`](/docs/defineIdleProperties.md)
- [`idle-callback-polyfills.mjs`](/docs/idle-callback-polyfills.md)
- [`IdleQueue.mjs`](/docs/IdleQueue.md)
- [`IdleValue.mjs`](/docs/IdleValue.md)

## Browser Support

<table>
  <tr>
    <td align="center">
      <img src="https://raw.githubusercontent.com/alrra/browser-logos/39.2.2/src/chrome/chrome_48x48.png" alt="Chrome"><br>
      ✔
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/alrra/browser-logos/39.2.2/src/firefox/firefox_48x48.png" alt="Firefox"><br>
      ✔
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/alrra/browser-logos/39.2.2/src/safari/safari_48x48.png" alt="Safari"><br>
      ✔
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/alrra/browser-logos/39.2.2/src/edge/edge_48x48.png" alt="Edge"><br>
      ✔
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/alrra/browser-logos/39.2.2/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png" alt="Internet Explorer"><br>
      9+
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/alrra/browser-logos/39.2.2/src/opera/opera_48x48.png" alt="Opera"><br>
      ✔
    </td>
  </tr>
</table>

This code has been tested and known to work in all major browsers as well as Internet Explorer back to version 9.

## License

[Apache 2.0](/LICENSE)
