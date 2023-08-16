import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { memo } from "react";
import { useForm } from "react-hook-form";

import Button from "components/Button";
import yup from "config/yupGlobal";

import classes from "./styles.module.scss";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().password().required("Password is required"),
  rememberMe: yup.boolean(),
});

const RegisterFormStep1 = memo(({ next }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    const account = {
      email: data.email,
      password: data.password,
      role: "COACH",
    };

    next(account);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.formGroup}>
        <label className={classes.formLabel}>Email</label>
        <input
          {...register("email")}
          className={classes.input}
          placeholder="Your Email"
        />
        {errors.email?.message && (
          <p className={classes.error}>{errors.email.message}</p>
        )}
      </div>
      <div className={clsx(classes.formGroup, classes.formGroupMarginTop)}>
        <label className={classes.formLabel}>Password</label>
        <input
          {...register("password")}
          className={classes.input}
          placeholder="Your Password"
          type="password"
        />
        {errors.password?.message && (
          <p className={classes.error}>{errors.password.message}</p>
        )}
      </div>
      <Button width="100%">Register</Button>
    </form>
  );
});

export default RegisterFormStep1;
