import { memo } from "react";

import classes from "./styles.module.scss";

const Header = memo(({ courseTitle, courseCode }) => {
  return (
    <header className={classes.pageHeader}>
      <h1 className={classes.pageHeading}>{courseTitle}</h1>
      <span className={classes.pageSubheading}>{courseCode}</span>
    </header>
  );
});

export default Header;
