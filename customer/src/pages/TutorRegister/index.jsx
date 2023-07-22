import { memo } from "react";
import { NavLink } from "react-router-dom";

import classes from "./styles.module.scss";
import { FacebookImgSrc, GoogleImgSrc } from "assets/images/icons";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import clsx from "clsx";
import Button from "components/Button";
import yup from "config/yupGlobal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().password().required("Password is required"),
  rememberMe: yup.boolean(),
});

const TutorRegisterPage = memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log({ errors });

  return (
    <div className={classes.container}>
      <div className={classes.pageHeader}>
        <h1 className={classes.pageTitle}>Sign up as a Tutor</h1>
        <p className={classes.signUpLinks}>
          <span>Already have an account?</span>{" "}
          <NavLink to="/login" className={classes.navLink}>
            Log in
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

      <form
        className={classes.form}
        onSubmit={handleSubmit(data => {
          console.log(data);
        })}
      >
        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Name</label>
          <input
            {...register("name")}
            className={classes.input}
            placeholder="Your Name"
          />
          {errors.name?.message && (
            <p className={classes.error}>{errors.name.message}</p>
          )}
        </div>
        <div className={clsx(classes.formGroup, classes.formGroupMarginTop)}>
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
        <FormControlLabel
          classes={{ root: classes.rememberMe }}
          control={<Checkbox {...register("rememberMe")} />}
          label="Remember me"
        />
        <br />
        <Button className={classes.submitButton} primary type="submit">
          Register
        </Button>
      </form>
    </div>
  );
});

export default TutorRegisterPage;
