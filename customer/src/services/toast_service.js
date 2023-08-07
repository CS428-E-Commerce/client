import { toast } from "react-toastify";

import {
  CloseButton,
  MessageFailureComponent,
  MessageSuccessComponent,
} from "../components/Toast";

export class ToastService {
  static getTypeToast(status) {
    switch (status) {
      case "info":
        return toast.TYPE.INFO;
      case "error":
        return toast.TYPE.ERROR;
      case "success":
        return toast.TYPE.SUCCESS;
      case "warning":
        return toast.TYPE.WARNING;
      default:
        return toast.TYPE.SUCCESS;
    }
  }

  static getColor(status) {
    switch (status) {
      case "info":
        return "#0F9F59";
      case "error":
        return "#CA1130";
      case "success":
        return "#0F9F59";
      case "warning":
        return "#0F9F59";
      default:
        return "#0F9F59";
    }
  }

  static show(message, _props) {
    const props = _props ?? {};

    const options = {
      autoClose: 5000,
      type: this.getTypeToast(props.status),
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_CENTER,
      pauseOnHover: true,
      className: "toast-grade",
      closeButton: CloseButton,
    };

    props.status === "success"
      ? toast(
          message && typeof message !== "string" ? (
            message
          ) : (
            <MessageSuccessComponent
              message={message ? message.toString() : ""}
            />
          ),
          options,
        )
      : toast(
          message && typeof message !== "string" ? (
            message
          ) : (
            <MessageFailureComponent
              message={message ? message.toString() : ""}
            />
          ),
          options,
        );
  }

  static error(message, _props) {
    this.show(message, { ..._props, status: "error" });
  }

  static success(message, _props) {
    this.show(message, { ..._props, status: "success" });
  }

  static info(message, _props) {
    this.show(message, { ..._props, status: "info" });
  }

  static normal(message, _props) {
    this.show(message, { ..._props, status: "default" });
  }

  static warning(message, _props) {
    this.show(message, { ..._props, status: "warning" });
  }
}
