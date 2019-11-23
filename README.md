# Promise Eager

This library allows a control flow where a set of promises
can eagerly resolve and provide a handler to the next promise that
will resolve.

```js
const { eagerResolution } = require('@apple/promise-eager');

// helper to create promises that resolve in some time.
function createPromise(val, timeout = 0) {
  return new Promise(resolve => {
    setTimeout(() => resolve(val), timeout);
  });
}

const promises = [
  createPromise("1", 1000),
  createPromise("2", 500),
  createPromise("3", 2000)
];

eagerResolution(promises).then(handleResolution);

function handleResolution(data) {
  console.log(data.val);

  if (data.next) {
    data.next.then(newData => handleResolution(newData));
  } else {
    console.log("done");
  }
}
```
