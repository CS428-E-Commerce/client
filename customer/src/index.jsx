import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "assets/scss/index.scss";
import { history, createConfigureStore } from "redux/configureStore";
import { Provider } from "react-redux";

const { store } = createConfigureStore();

const Index = (
  <Provider store={store}>
    <App history={history} dispatch={store.dispatch} />
    <ToastContainer autoClose={1500} />
  </Provider>
);

ReactDOM.render(Index, document.getElementById("root"));
