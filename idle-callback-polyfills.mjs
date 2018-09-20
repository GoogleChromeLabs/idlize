/*
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {now} from './lib/now.mjs';


const supportsRequestIdleCallback_ = typeof requestIdleCallback === 'function';

/**
 * A minimal shim of the native IdleDeadline class.
 */
class IdleDealine {
  /** @param {number} initTime */
  constructor(initTime) {
    this.initTime_ = initTime;
  }
  /** @return {boolean} */
  get didTimeout() {
    return false;
  }
  /** @return {number} */
  timeRemaining() {
    return Math.max(0, 50 - (now() - this.initTime_));
  }
}

/**
 * A minimal shim for the requestIdleCallback function. This accepts a
 * callback function and runs it at the next idle period, passing in an
 * object with a `timeRemaining()` method.
 * @private
 * @param {!Function} callback
 * @return {number}
 */
const requestIdleCallbackShim = (callback) => {
  const deadline = new IdleDealine(now());
  return setTimeout(() => callback(deadline), 0);
};


/**
 * A minimal shim for the  cancelIdleCallback function. This accepts a
 * handle identifying the idle callback to cancel.
 * @private
 * @param {number|null} handle
 */
const cancelIdleCallbackShim = (handle) => {
  clearTimeout(handle);
};


/**
 * The native `requestIdleCallback()` function or `cancelIdleCallbackShim()`
 *.if the browser doesn't support it.
 * @param {!Function} callback
 * @return {number}
 */
export const rIC = supportsRequestIdleCallback_ ?
    requestIdleCallback : requestIdleCallbackShim;


/**
 * The native `cancelIdleCallback()` function or `cancelIdleCallbackShim()`
 * if the browser doesn't support it.
 * @param {number} handle
 */
export const cIC = supportsRequestIdleCallback_ ?
    cancelIdleCallback : cancelIdleCallbackShim;
