import { memo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { NavLink, useHistory, useLocation } from "react-router-dom";
import yup from "config/yupGlobal";

import classes from "./styles.module.scss";
import { FacebookImgSrc, GoogleImgSrc } from "assets/images/icons";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import clsx from "clsx";
import Button from "components/Button";
import { useForm } from "react-hook-form";
import ApiService from "services/api_service";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().password().required("Password is required"),
  rememberMe: yup.boolean(),
});

const LoginPage = memo(() => {
  const history = useHistory();
  const location = useLocation();

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
    };
    const response = await ApiService.POST("/api/auth/login", account);
    localStorage.setItem("auth", response.data);

    if (location.state.prevLocation) {
      return history.replace(location.state.prevLocation);
    }
    history.replace("/");
  };

  return (
    <div className={classes.container}>
      <div className={classes.pageHeader}>
        <h1 className={classes.pageTitle}>Log in</h1>
        <p className={classes.signUpLinks}>
          <NavLink to="/student-signup" className={classes.navLink}>
            Sign up as a student
          </NavLink>{" "}
          <span>or</span>{" "}
          <NavLink to="/tutor-signup" className={classes.navLink}>
            Sign up as a tutor
          </NavLink>
        </p>
      </div>

      <div className={classes.oauthLogin}>
        <div className={classes.oauthBadge}>
          <img
            className={classes.oauthIcon}
            src={GoogleImgSrc}
            alt="Google Icon"
          />
          <div className={classes.oauthText}>Continue with Google</div>
        </div>
        <div className={classes.oauthBadge}>
          <img
            className={classes.oauthIcon}
            src={FacebookImgSrc}
            alt="Facebook Icon"
          />
          <span className={classes.oauthText}>Continue with Facebook</span>
        </div>
      </div>

      <div className={classes.divider}>
        <span className={classes.leftDivider} />
        <span className={classes.text}>or</span>
        <span className={classes.rightDivider} />
      </div>

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

        <div className={classes.forgotPassword}>Forgot your password?</div>
        <FormControlLabel
          classes={{ root: classes.rememberMe }}
          control={<Checkbox {...register("rememberMe")} />}
          label="Remember me"
        />
        <br />
        <Button className={classes.submitButton} primary type="submit">
          Log in
        </Button>
      </form>
    </div>
  );
});

export default LoginPage;
