import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { createConfigureStore, history } from "redux/configureStore";

import App from "./App";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "assets/scss/index.scss";

const { store } = createConfigureStore();

const Index = (
  <Provider store={store}>
    <App history={history} dispatch={store.dispatch} />
    <ToastContainer autoClose={1500} />
  </Provider>
);

ReactDOM.render(Index, document.getElementById("root"));
