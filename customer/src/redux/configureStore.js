import { configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";

import middlewares from "redux/middlewares";
import createRootReducer from "redux/reducers";
import { rootSaga } from "redux/sagas";

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

export const createConfigureStore = () => {
  const store = configureStore({
    reducer: createRootReducer(history),
    middleware: getDefaultMiddleware => {
      return [
        ...getDefaultMiddleware({ thunk: false }),
        sagaMiddleware,
        ...middlewares(history),
      ];
    },
    devTools: process.env.NODE_ENV !== "production",
  });

  sagaMiddleware.run(rootSaga);

  return { store };
};
