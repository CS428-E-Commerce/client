import { memo } from "react";
import classes from "./styles.module.scss";

const HomePage = memo(() => {
  return <div className={classes.container}>Hello world!</div>;
});

export default HomePage;
