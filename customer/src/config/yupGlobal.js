import * as yup from "yup";

const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z_.\-@]{8,}$/;

yup.addMethod(yup.string, "password", function (message) {
  return this.matches(REGEX_PASSWORD, {
    message: message
      ? message
      : "Password must be at least 8 characters. There must be an alphabet, a number, or _.-@",
  });
});

export default yup;
