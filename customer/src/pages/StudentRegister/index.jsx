import { memo } from "react";
import { NavLink } from "react-router-dom";

import classes from "./styles.module.scss";
import { FacebookImgSrc, GoogleImgSrc } from "assets/images/icons";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import clsx from "clsx";
import Button from "components/Button";

const StudentRegisterPage = memo(() => {
  return (
    <div className={classes.container}>
      <div className={classes.pageHeader}>
        <h1 className={classes.pageTitle}>Sign up as a Student</h1>
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

      <form className={classes.form}>
        <FormControl classes={{ root: classes.formControl }}>
          <label className={classes.formLabel}>Name</label>
          <input className={classes.input} placeholder="Your Name" />
        </FormControl>
        <FormControl
          classes={{
            root: clsx(classes.formControl, classes.formControlMarginTop),
          }}
        >
          <label className={classes.formLabel}>Email</label>
          <input className={classes.input} placeholder="Your Email" />
        </FormControl>
        <FormControl
          classes={{
            root: clsx(classes.formControl, classes.formControlMarginTop),
          }}
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
        <Button className={classes.submitButton} primary>
          Register
        </Button>
      </form>
    </div>
  );
});

export default StudentRegisterPage;
