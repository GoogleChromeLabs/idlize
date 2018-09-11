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

import {cIC, rIC} from './idle-callback-polyfills.mjs';


/**
 * A class that wraps a value that is initialized when idle.
 */
export class IdleValue {
  /**
   * Accepts a function to initialize the value of a variable when idle.
   * @param {Function} init
   */
  constructor(init) {
    this.init_ = init;

    /** @type (?|undefined) */
    this.value_;

    this.idleHandle_ = rIC(() => {
      this.value_ = this.init_();
    });
  }

  /**
   * Returns the value if it's already been initialized. If it hasn't then the
   * initializer function is run immediately and the pending idle callback
   * is cancelled.
   * @return {?}
   */
  getValue() {
    if (this.value_ === undefined) {
      this.cancleIdleInit_();
      this.value_ = this.init_();
    }
    return this.value_;
  }

  /**
   * @param {?} newValue
   */
  setValue(newValue) {
    this.cancleIdleInit_();
    this.value_ = newValue;
  }

  /**
   * Cancels any scheduled requestIdleCallback and resets the handle.
   * @private
   */
  cancleIdleInit_() {
    if (this.idleHandle_) {
      cIC(this.idleHandle_);
      this.idleHandle_ = null;
    }
  }
}
