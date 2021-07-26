/*
 * Express will catch any exception thrown within the initial synchronous execution of a route
 * and pass it along to the next error-handling middleware.
 * In asynchronous code, Express cannot catch exceptions as you’ve lost your stack once you have entered a callback.
 */
export const asyncCatcher = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);

export const toAsyncRouter = (router, middlewares = [], methods = ['get', 'post', 'delete']) => {
  for (let key in router) {
    if (methods.includes(key)) {
      let method = router[key];
      router[key] = (path, ...callbacks) => method.call(
        router,
        path,
        ...[
          ...middlewares,
          ...callbacks.map(cb => asyncCatcher(cb))
        ],
      );
    }
  }
  return router;
};
