import { createStore, compose, applyMiddleware } from 'redux';
/**
 * compose: join more than 1 instructions to be executed
 */

export default (reducers, middlewares) => {
  /** for reactotron work with redux and Saga Middleware */
  const enhancer = __DEV__
    ? compose(
        console.tron.createEnhancer(),
        applyMiddleware(...middlewares)
      )
    : applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};
