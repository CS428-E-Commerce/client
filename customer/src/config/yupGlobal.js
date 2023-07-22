import * as yup from "yup";

const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)[\da-zA-Z\W]{8,}$/;

yup.addMethod(yup.string, "password", function (message) {
  return this.matches(REGEX_PASSWORD, {
    message: message
      ? message
      : "Password must be at least 8 characters. There must be an alphabet, a number, and a special character",
  });
});

export default yup;
