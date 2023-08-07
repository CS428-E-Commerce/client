import { memo } from "react";

import classes from "./styles.module.scss";

const LoadingScreen = memo(() => {
  return (
    <div className={classes.root}>
      <div className={classes.loading}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
});

export default LoadingScreen;
