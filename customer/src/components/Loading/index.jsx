import { memo } from "react";
import classes from "./styles.module.scss";
import clsx from "clsx";
import { LoadingIcon } from "assets/images";

const Loading = memo(props => {
  const { className, ...rest } = props;
  return (
    <div className={clsx(classes.loadingContainer, className)} {...rest}>
      <div className={classes.isLoading}>
        <LoadingIcon />
      </div>
      <div className={classes.loadingText}>Loading, please wait...</div>
    </div>
  );
});

export default Loading;
