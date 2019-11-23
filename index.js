function eagerResolution(promises) {
  return new Promise(primaryResolve => {
    // we need one less than the number of promises, since we already have this one main one.
    const bundles = promises.map(() => getPromiseBundle()).slice(0, -1);

    let currentResolverFunction = primaryResolve;

    promises.forEach(p => {
      p.then(val => {
        const bundle = bundles.pop();

        let nextPromise;
        let nextResolver;

        if (bundle) {
          nextPromise = bundle.promise;
          nextResolver = bundle.resolver;
        }

        currentResolverFunction({ val, next: nextPromise });
        currentResolverFunction = nextResolver; // reassign for the next one
      });
    });
  });
}

function getPromiseBundle() {
  let r;
  const p = new Promise(_r => (r = _r));
  return { promise: p, resolver: r };
}

module.exports = {
  eagerResolution
}