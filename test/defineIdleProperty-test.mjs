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

import {defineIdleProperty} from '../defineIdleProperty.mjs';
import {IdleValue} from '../IdleValue.mjs';


const sandbox = sinon.createSandbox();

describe(`defineIdleProperty`, () => {
  afterEach(() => {
    sandbox.restore();
  });

  describe(`defineIdleProperty`, () => {
    it(`defines a property on the passed object`, () => {
      const obj = {};
      defineIdleProperty(obj, 'prop', sandbox.spy());

      assert(obj.hasOwnProperty('prop'));

      const descriptor = Object.getOwnPropertyDescriptor(obj, 'prop');

      assert.equal(descriptor.configurable, true);
      assert.equal(descriptor.enumerable, false);
      assert(typeof descriptor.get === 'function');
      assert(typeof descriptor.set === 'function');
    });

    it(`defines a getter that shadows IdleValue#getValue`, () => {
      sandbox.spy(IdleValue.prototype, 'getValue');

      const initStub = sandbox.stub().returns('42');

      const obj = {};
      defineIdleProperty(obj, 'prop', initStub);

      assert(IdleValue.prototype.getValue.notCalled);

      assert.equal(obj.prop, '42');
      assert(IdleValue.prototype.getValue.calledOnce);
    });

    it(`defines a setter that shadows IdleValue#setValue`, () => {
      sandbox.spy(IdleValue.prototype, 'setValue');

      const initStub = sandbox.stub().returns('42');

      const obj = {};
      defineIdleProperty(obj, 'prop', initStub);

      assert(IdleValue.prototype.setValue.notCalled);

      obj.prop = 'newValue';

      assert(IdleValue.prototype.setValue.calledOnce);
      assert(IdleValue.prototype.setValue.calledWith('newValue'));
      assert.equal(obj.prop, 'newValue');
    });
  });
});
