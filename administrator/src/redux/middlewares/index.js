import loggerMiddleware from "redux/middlewares/logger";
import routerMiddleware from "redux/middlewares/router";
import sagaMiddleware from "redux/middlewares/saga";

export default history => {
  if (process.env.NODE_ENV !== "production") {
    return [routerMiddleware(history), loggerMiddleware, sagaMiddleware];
  } else {
    return [routerMiddleware(history), sagaMiddleware];
  }
};
