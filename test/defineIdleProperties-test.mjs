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

import {defineIdleProperties} from '../defineIdleProperties.mjs';
import {IdleValue} from '../IdleValue.mjs';


const sandbox = sinon.createSandbox();

describe(`defineIdleProperties`, () => {
  afterEach(() => {
    sandbox.restore();
  });

  describe(`defineIdleProperties`, () => {
    it(`defines a property for each passed prop`, () => {
      const obj = {};
      const spy1 = sinon.spy();
      const spy2 = sinon.spy();
      const spy3 = sinon.spy();

      defineIdleProperties(obj, {
        prop1: spy1,
        prop2: spy2,
        prop3: spy3,
      });

      for (let i = 1; i <= 3; ++i) {
        assert(obj.hasOwnProperty(`prop${i}`));
        const descriptor = Object.getOwnPropertyDescriptor(obj, `prop${i}`);

        assert.equal(descriptor.configurable, true);
        assert.equal(descriptor.enumerable, false);
        assert(typeof descriptor.get === 'function');
        assert(typeof descriptor.set === 'function');
      }
    });

    it(`defines getters shadowing IdleValue#getValue for each prop`, () => {
      sandbox.spy(IdleValue.prototype, 'getValue');

      const obj = {};
      const initStub1 = sandbox.stub().returns('A');
      const initStub2 = sandbox.stub().returns('B');
      const initStub3 = sandbox.stub().returns('C');

      defineIdleProperties(obj, {
        prop1: initStub1,
        prop2: initStub2,
        prop3: initStub3,
      });

      assert(IdleValue.prototype.getValue.notCalled);

      assert.equal(obj.prop1, 'A');
      assert(IdleValue.prototype.getValue.calledOnce);
      assert.equal(obj.prop2, 'B');
      assert(IdleValue.prototype.getValue.calledTwice);
      assert.equal(obj.prop3, 'C');
      assert(IdleValue.prototype.getValue.calledThrice);
    });

    it(`defines setters shadowing IdleValue#setValue for each prop`, () => {
      sandbox.spy(IdleValue.prototype, 'setValue');

      const obj = {};
      const initStub1 = sandbox.stub().returns('A');
      const initStub2 = sandbox.stub().returns('B');
      const initStub3 = sandbox.stub().returns('C');

      defineIdleProperties(obj, {
        prop1: initStub1,
        prop2: initStub2,
        prop3: initStub3,
      });

      assert(IdleValue.prototype.setValue.notCalled);

      obj.prop1 = 'A2';
      assert(IdleValue.prototype.setValue.calledOnce);
      assert(IdleValue.prototype.setValue.getCall(0).calledWith('A2'));
      assert.equal(obj.prop1, 'A2');

      obj.prop2 = 'B2';
      assert(IdleValue.prototype.setValue.calledTwice);
      assert(IdleValue.prototype.setValue.getCall(1).calledWith('B2'));
      assert.equal(obj.prop2, 'B2');

      obj.prop3 = 'C2';
      assert(IdleValue.prototype.setValue.calledThrice);
      assert(IdleValue.prototype.setValue.getCall(2).calledWith('C2'));
      assert.equal(obj.prop3, 'C2');
    });
  });
});
