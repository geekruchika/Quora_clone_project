import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import logger from "redux-logger";
import allReducers from "../reducers/combineAllreducer";
import rootSaga from "../sagas/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(allReducers, applyMiddleware(logger, sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
