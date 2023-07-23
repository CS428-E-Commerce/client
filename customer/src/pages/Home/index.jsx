import { memo } from "react";
import classes from "./styles.module.scss";

const HomePage = memo(() => {
  return <div className={classes.container}>Welcome! This is homepage.</div>;
});

export default HomePage;
