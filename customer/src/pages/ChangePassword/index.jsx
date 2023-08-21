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
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup.string().required("New password is required").password(),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

const ChangePasswordPage = memo(() => {
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

  const onSubmit = async data => {
    console.log(data);

    const bodyObject = {
      password: CryptoJS.AES.encrypt(
        data.oldPassword,
        "VinglishVjpPro",
      ).toString(),
      newPassword: CryptoJS.AES.encrypt(
        data.newPassword,
        "VinglishVjpPro",
      ).toString(),
    };

    dispatch(setLoading(true));
    ApiService.POST("/api/auth/change-password", bodyObject)
      .then(() => {
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
        <h1 className={classes.pageTitle}>Change Password</h1>
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
          <label className={classes.formLabel}>Old password</label>
          <input
            {...register("oldPassword")}
            className={classes.input}
            placeholder="Your Old Password"
            type="password"
          />
          {errors.oldPassword?.message && (
            <p className={classes.error}>{errors.oldPassword.message}</p>
          )}
        </div>

        <div className={clsx(classes.formGroup, classes.formGroupMarginTop)}>
          <label className={classes.formLabel}>New password</label>
          <input
            {...register("newPassword")}
            className={classes.input}
            placeholder="Your New Password"
            type="password"
          />
          {errors.newPassword?.message && (
            <p className={classes.error}>{errors.newPassword.message}</p>
          )}
        </div>

        <div className={clsx(classes.formGroup, classes.formGroupMarginTop)}>
          <label className={classes.formLabel}>Confirm new password</label>
          <input
            {...register("confirmNewPassword")}
            className={classes.input}
            placeholder="Your New Password"
            type="password"
          />
          {errors.confirmNewPassword?.message && (
            <p className={classes.error}>{errors.confirmNewPassword.message}</p>
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
        <Button width="100%">Change password</Button>
      </form>
    </div>
  );
});

export default ChangePasswordPage;
