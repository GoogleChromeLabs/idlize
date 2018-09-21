# `IdleQueue.mjs`

[`idlize/IdleQueue.mjs`](/IdleQueue.mjs)

## Overview

The `IdleQueue` class is a helper that allows developers to implement the [*idle-until-urgent*](https://philipwalton.com/articles/idle-until-urgent/) pattern in their code. It's useful for apps that want to split up their logic into a sequence of functions and schedule them to run idly.

This class offers a few benefits over the regular usage of [`requestIdleCallback()`](https://developers.google.com/web/updates/2015/08/using-requestidlecallback):

- The queue can be configured so all queued functions are guaranteed to run before the page is unloaded.
- Queued tasks can be run immediately at any time.
- Queued tasks can pass a minimum time budget, below which they won't attempt to run (this minimum time budget can also be configured per queue).
- Queued tasks store the time/visibilityState when they were added to the queue, and are invoked with this data when run.

### Exports

- [`IdleQueue`](#idlequeue)

### Usage

```js
import {IdleQueue} from 'idlize/IdleQueue.mjs';

const queue = new IdleQueue();

queue.pushTask(() => {
  // Some expensive function that can run idly...
});

queue.pushTask(() => {
  // Some other task that depends on the above
  // expensive function having already run...
});
```

## `IdleQueue`

### Methods

<table>
  <tr valign="top">
    <th align="left">Name</th>
    <th align="left">Description</th>
  </tr>
  <tr valign="top" id="param-constructor">
    <td><code>constructor(options)</code></td>
    <td>
      <p><strong>Parameters:</strong></p>
      <ul>
        <li>
          <code>options.ensureTasksRun</code> <emn>(boolean)</em>
          Adds Page Lifecycle callbacks to ensure the queue is run before the user leaves the page <em>(default: <code>false</code>)</em>.
        </li>
        <li>
          <code>options.defaultMinTaskTime</code>: <em>(number)</em>
          The default amount of idle time remaining in order for a task to be run <em>(default: <code>0</code>)</em>.
        </li>
      </ul>
    </td>
  </tr>
  <tr valign="top" id="param-pushtask">
    <td><code>pushTask(task, options)</code></td>
    <td>
      <p><strong>Parameters:</strong></p>
      <ul>
        <li><code>task</code>: <em>(function(Object))</em>
          The task to add to the end of the queue.
        </li>
        <li><code>options.minTaskTime</code>: <em>(number)</em>
          The minimum amount of idle time remaining in order for a task to be run. If no value is passed, the queue default is used.
        </li>
      </ul>
      <p>Adds a task to the end of the queue and schedules the queue to be run when next idle (if not already scheduled).</p>
      <p>When the task is run, it's invoked with an object containing the following properties:</p>
      <ul>
        <li><code>time</code>: <em>(number)</em>
          The time (epoch time in milliseconds) when the task was added to the queue.
        </li>
        <li><code>visibilityState</code>: <em>(string)</em>
          The visibility state of the document when the task was added to the queue.
        </li>
      </ul>
    </td>
  </tr>
  <tr valign="top" id="param-unshifttask">
    <td><code>unshiftTask(task, options)</code></td>
    <td>
      <p><strong>Parameters:</strong></p>
      <ul>
        <li><code>task</code>: <em>(function(Object<{{time: number, visibilityState: string}}>))</em>
          The task to add to the beginning of the queue.
        </li>
        <li><code>options.minTaskTime</code>: <em>(number)</em>
          The minimum amount of idle time remaining in order for a task to be run. If no value is passed, the queue default is used.
        </li>
      </ul>
      <p>Adds a task to the beginning of the queue and schedules the queue to be run when next idle (if not already scheduled).</p>
      <p>When the task is run, it's invoked with an object containing the following properties:</p>
      <ul>
        <li><code>time</code>: <em>(number)</em>
          The time (epoch time in milliseconds) when the task was added to the queue.
        </li>
        <li><code>visibilityState</code>: <em>(string)</em>
          The visibility state of the document when the task was added to the queue.
        </li>
      </ul>
    </td>
  </tr>
  <tr valign="top" id="param-runtasksimmediately">
    <td><code>runTasksImmediately()</code></td>
    <td>
      <p>Runs all queued tasks immediately (synchronously).</p>
    </td>
  </tr>
  <tr valign="top" id="param-haspendingtasks">
    <td><code>hasPendingTasks()</code></td>
    <td>
      <p><strong>Returns:</strong> <em>(boolean)</em></p>
      <p>True if the queue has any tasks not yet run.</p>
    </td>
  </tr>
  <tr valign="top" id="param-clearpendingtasks">
    <td><code>clearPendingTasks()</code></td>
    <td>
      <p>Unschedules all pending tasks in the queue.</p>
    </td>
  </tr>
  <tr valign="top" id="param-getstate">
    <td><code>getState()</code></td>
    <td>
      <p><strong>Returns:</strong> <em>(Object)</em></p>
      <ul>
        <li><code>{time}</code>: <em>(number)</em>
          The time (milliseconds, in epoch time) the task was added to the queue.
        </li>
        <li><code>{visibilityState}</code>: <em>(string)</em>
          The document's visibility state when the task was added to the queue.
        </li>
      </ul>
    </td>
  </tr>
</table>
