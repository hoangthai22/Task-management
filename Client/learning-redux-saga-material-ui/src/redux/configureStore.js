import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./../reducers";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootSaga from './../sagas';

const compossEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose;

const sagaMiddleware = createSagaMiddleware();

//sau này có thể truyền các func vào đây để nâng cấp mở rộng, vd router...
const configureStore = () => {
  const middlewares = [thunk, sagaMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(rootReducer, compossEnhancers(...enhancers));
  sagaMiddleware.run(rootSaga);
  return store;
};



export default configureStore;
