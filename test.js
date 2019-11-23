const { eagerResolution } = require('.');

const promises = [
  anAsync("1", 1000),
  anAsync("2", 500),
  anAsync("3", 2000)
];

eagerResolution(promises).then(handleData);

function anAsync(val, timeout = 0) {
  return new Promise(resolve => {
    setTimeout(() => resolve(val), timeout);
  });
}

function handleData(data) {
  console.log(data.val);

  if (data.next) {
    data.next.then(newData => handleData(newData));
  } else {
    console.log("done");
  }
}