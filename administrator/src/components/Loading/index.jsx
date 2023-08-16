import clsx from "clsx";
import { memo } from "react";

import { LoadingIcon } from "assets/images";

import classes from "./styles.module.scss";

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
