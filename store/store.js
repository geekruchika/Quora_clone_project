// import { createStore, applyMiddleware } from "redux";
// import { Provider } from "react-redux";
// import allReducers from "../reducers/combineAllreducer";
// // import { apiMiddleware, reducer } from "./redux";

// const store = createStore(allReducers);
// export default store;

import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import logger from "redux-logger";
// import thunk from "redux-thunk";
// import promise from "redux-promise-middleware";
import allReducers from "../reducers/combineAllreducer";
import rootSaga from "../sagas/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(allReducers, applyMiddleware(logger, sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
