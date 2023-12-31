import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import clsx from "clsx";
import { push } from "connected-react-router";
import CryptoJS from "crypto-js";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";

import { FacebookImageSrc, GoogleImageSrc } from "assets/images";
import Button from "components/Button";
import yup from "config/yupGlobal";
import { setLoading } from "redux/reducers/Status/actionTypes";
import ApiService from "services/api_service";
import { ToastService } from "services/toast_service";

import classes from "./styles.module.scss";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().password().required("Password is required"),
  rememberMe: yup.boolean(),
});

const LoginPage = memo(() => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(push(`/`));
    }
  }, []);

  const onSubmit = async data => {
    const account = {
      email: data.email,
      password: CryptoJS.AES.encrypt(
        data.password,
        "VinglishVjpPro",
      ).toString(),
    };

    dispatch(setLoading(true));
    ApiService.POST("/api/auth/login", account)
      .then(response => {
        localStorage.setItem("token", response?.data?.accessToken);
        localStorage.setItem("email", response?.data?.email);

        if (location?.state?.prevLocation) {
          return history?.replace(location?.state?.prevLocation);
        }
        history?.replace("/");
      })
      .catch(error => {
        console.log(error);
        ToastService.error("Sorry, an error occurred.");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
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

      {/* <div className={classes.oauthLogin}>
        <div
          className={classes.oauthBadge}
          onClick={() => {
            ToastService.error("Sorry, this is currently not available.");
          }}
        >
          <img
            className={classes.oauthIcon}
            src={GoogleImageSrc}
            alt="Google Icon"
          />
          <div className={classes.oauthText}>Continue with Google</div>
        </div>
        <div
          className={classes.oauthBadge}
          onClick={() => {
            ToastService.error("Sorry, this is currently not available.");
          }}
        >
          <img
            className={classes.oauthIcon}
            src={FacebookImageSrc}
            alt="Facebook Icon"
          />
          <span className={classes.oauthText}>Continue with Facebook</span>
        </div>
      </div>

      <div className={classes.divider}>
        <span className={classes.leftDivider} />
        <span className={classes.text}>or</span>
        <span className={classes.rightDivider} />
      </div> */}

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

        {/* <div
          className={classes.forgotPassword}
          onClick={() => {
            ToastService.error("Sorry, this is currently not available.");
          }}
        >
          Forgot your password?
        </div> */}
        {/* <FormControlLabel
          classes={{ root: classes.rememberMe }}
          control={<Checkbox {...register("rememberMe")} />}
          label="Remember me"
        />
        <br /> */}
        <Button width="100%">Log in</Button>
      </form>
    </div>
  );
});

export default LoginPage;
