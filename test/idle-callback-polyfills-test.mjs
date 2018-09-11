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

import {when} from './helpers.mjs';
import {cIC, rIC} from '../idle-callback-polyfills.mjs';


const sandbox = sinon.createSandbox();

describe(`idle-callback-polyfills`, () => {
  describe(`rIC`, () => {
    afterEach(() => {
      sandbox.restore();
    });

    it(`accepts a function and calls it with an IdleDealine object`, async () => {
      const spy = sandbox.spy();

      rIC(spy);

      await when(() => spy.calledOnce);

      assert(spy.calledWith(sinon.match({
        didTimeout: false,
        timeRemaining: sinon.match.func,
      })));
    });

    it(`does not call the function in the current task`, () => {
      const spy = sandbox.spy();

      rIC(spy);
      assert(spy.notCalled);
    });
  });

  describe(`cIC`, () => {
    afterEach(() => {
      sandbox.restore();
    });

    it(`cancels a scheduled rIC`, async () => {
      const spy1 = sandbox.spy();
      const spy2 = sandbox.spy();

      const handle1 = rIC(spy1);
      rIC(spy2);

      assert(spy1.notCalled);
      assert(spy2.notCalled);

      cIC(handle1);

      // Idle callbacks are called in the order they're queued, so spy2 can
      // only be called is either spy1 is called or the first rIC is cancelled.
      await when(() => spy2.calledOnce);

      assert(spy1.notCalled);
      assert(spy2.calledOnce);
    });
  });
});
