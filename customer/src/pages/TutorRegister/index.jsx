import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import clsx from "clsx";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import { FacebookImageSrc, GoogleImageSrc } from "assets/images";
import Button from "components/Button";
import yup from "config/yupGlobal";
import { setLoading } from "redux/reducers/Status/actionTypes";
import ApiService from "services/api_service";
import { ToastService } from "services/toast_service";

import RegisterFormFinalStep from "./components/RegisterFormFinalStep";
import RegisterFormStep1 from "./components/RegisterFormStep1";
import classes from "./styles.module.scss";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().password().required("Password is required"),
  rememberMe: yup.boolean(),
});

const STEPS = {
  ONE: "1",
  FINAL: "2",
};

const TutorRegisterPage = memo(() => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [step, setStep] = useState(STEPS.ONE);
  const [user, setUser] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (isRegistered) {
      ApiService.GET("/api/user")
        .then(response => {
          setUser(response?.data);
        })
        .catch(error => {
          console.error(error);
          ToastService.error("Sorry, an error occurred.");
        });
    }
  }, [isRegistered]);

  const onFormStep1Submit = async data => {
    const account = {
      email: data.email,
      password: data.password,
      role: "COACH",
    };

    dispatch(setLoading(true));
    ApiService.POST("/api/auth/signup", account)
      .then(response => {
        localStorage.setItem("token", response?.data?.accessToken);
        localStorage.setItem("email", response?.data?.email);
        setStep(STEPS.FINAL);
        setIsRegistered(true);

        // if (location?.state?.prevLocation) {
        //   return history?.replace(location?.state?.prevLocation);
        // }
        // history?.replace("/");
      })
      .catch(error => {
        console.log(error);
        ToastService.error("Sorry, an error occurred.");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const onFromFinalStepSubmit = async data => {
    dispatch(setLoading(true));
    data.skills = data.skills.split(", ");
    data.certificates = data.certificates.split(", ");
    ApiService.PUT(`/api/coach/${user?.coachInfo?.id}`, data) // TODO: How to get coachId?
      .then(() => {
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
        <h1 className={classes.pageTitle}>Sign up as a Tutor</h1>
        <p className={classes.signUpLinks}>
          <span>Already have an account?</span>{" "}
          <NavLink to="/login" className={classes.navLink}>
            Log in
          </NavLink>
        </p>
      </div>

      <div className={classes.oauthLogin}>
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
      </div>

      {step === STEPS.ONE && <RegisterFormStep1 next={onFormStep1Submit} />}
      {step === STEPS.FINAL && (
        <RegisterFormFinalStep next={onFromFinalStepSubmit} />
      )}
    </div>
  );
});

export default TutorRegisterPage;
