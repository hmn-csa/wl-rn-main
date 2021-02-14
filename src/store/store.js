// Imports: Dependencies
import { createStore, applyMiddleware } from 'redux';

import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga';

// Imports: Redux Root Reducer
import rootReducer from '../reducers/index';

// Imports: Redux Root Saga
import { rootSaga } from '../sagas/index';

// Middleware: Redux Saga
const sagaMiddleware = createSagaMiddleware();

// Redux: Store
const store = createStore(
  rootReducer, composeWithDevTools(
    applyMiddleware(
      sagaMiddleware,
      //createLogger(),
    ),
  )
);

// const store = createStore(
//   rootReducer,
//   applyMiddleware(
//     sagaMiddleware,
//     createLogger(),
//   ),
// );

// Middleware: Redux Saga
sagaMiddleware.run(rootSaga);

// Exports
export {
  store,
}