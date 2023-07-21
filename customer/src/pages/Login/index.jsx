import { memo } from "react";
import { NavLink } from "react-router-dom";

import classes from "./styles.module.scss";
import { FacebookImgSrc, GoogleImgSrc } from "assets/images/icons";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import clsx from "clsx";
import Button from "components/Button";

const LoginPage = memo(() => {
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

      <form className={classes.form}>
        <FormControl classes={{ root: classes.formControl }}>
          <label className={classes.formLabel}>Email</label>
          <input className={classes.input} placeholder="Your Email" />
        </FormControl>
        <FormControl
          classes={{ root: clsx(classes.formControl, classes.lastFormControl) }}
        >
          <label className={classes.formLabel}>Password</label>
          <input className={classes.input} placeholder="Your Password" />
        </FormControl>
        <div className={classes.forgotPassword}>Forgot your password?</div>
        <FormControlLabel
          classes={{ root: classes.rememberMe }}
          control={<Checkbox />}
          label="Remember me"
        />
        <br />
        <Button className={classes.submitButton} primary>Log in</Button>
      </form>
    </div>
  );
});

export default LoginPage;
