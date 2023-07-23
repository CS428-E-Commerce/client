import * as yup from "yup";

const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[\da-zA-Z\W]{8,}$/;

yup.addMethod(yup.string, "password", function (message) {
  return this.matches(REGEX_PASSWORD, {
    message: message
      ? message
      : "Password must be at least 8 characters. There must be a lowercase, an uppercase, a number, and a special character",
  });
});

export default yup;
