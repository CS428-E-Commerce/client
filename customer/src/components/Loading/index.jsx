import { memo } from "react";
import LoadingIcon from "assets/images/icons/loading.svg";
import ErrorIcon from "assets/images/icons/error-sign.svg";
import classes from "./styles.module.scss";
import clsx from "clsx";
import SubmitButton from "components/SubmitButton";

const Loading = memo(props => {
  const {
    isLoading = true,
    errorText,
    loadingText,
    className,
    errorButtonText,
    errorButtonOnClick,
    ...rest
  } = props;

  const message = {
    loading: loadingText || "Loading, please wait...",
    error: errorText || "An error occurred, please try again later.",
  };

  return (
    <div className={clsx(classes.loadingContainer, className)} {...rest}>
      <div className={clsx({ [classes.isLoading]: isLoading })}>
        <img src={isLoading ? LoadingIcon : ErrorIcon} alt="Icon" />
      </div>
      <div className={classes.loadingText}>
        {isLoading ? message.loading : message.error}
      </div>
      {!isLoading && errorButtonText ? (
        <SubmitButton className="mb-5" onClick={errorButtonOnClick}>
          {errorButtonText}
        </SubmitButton>
      ) : null}
    </div>
  );
});

export default Loading;
