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

const createQueueMicrotaskViaPromises = () => {
  return (microtask) => {
    Promise.resolve().then(microtask);
  };
};

const createQueueMicrotaskViaMutationObserver = () => {
  let i = 0;
  let microtaskQueue = [];
  const observer = new MutationObserver(() => {
    microtaskQueue.forEach((microtask) => microtask());
    microtaskQueue = [];
  });
  const node = document.createTextNode('');
  observer.observe(node, {characterData: true});

  return (microtask) => {
    microtaskQueue.push(microtask);

    // Trigger a mutation observer callback, which is a microtask.
    node.data = String(++i % 2);
  };
};

/**
 * Queues a function to be run in the next microtask. If the browser supports
 * Promises, those are used. Otherwise it falls back to MutationObserver.
 * Note: since Promise polyfills are popular but not all support microtasks,
 * we check for native implementation rather than a polyfill.
 * @private
 * @param {!Function} microtask
 */
export const queueMicrotask = typeof Promise === 'function' &&
    Promise.toString().indexOf('[native code]') > -1 ?
        createQueueMicrotaskViaPromises() :
        createQueueMicrotaskViaMutationObserver();
