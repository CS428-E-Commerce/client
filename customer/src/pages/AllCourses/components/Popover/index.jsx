import clsx from "clsx";

import { PopupCaretIcon } from "assets/images/icons";

import classes from "./styles.module.scss";
import { memo } from "react";

const Popover = memo(({ show }) => {
  return (
    <div className={clsx(classes.popover, { [classes.show]: show })}>
      <PopupCaretIcon className={classes.popoverCaretIcon} />
      <img
        className={classes.tutorAvatar}
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2980&q=80"
        alt=""
      />
      <div className={classes.tutorInfo}>
        <h3 className={classes.tutorName}>Dao T.</h3>
        <ul>
          <li>Certified Vietnamese tutor</li>
        </ul>
      </div>
      <div className={classes.speak}>
        <h3 className={classes.speakHeading}>Speaks</h3>
        <ul>
          <li>English</li>
          <li>Vietnamese</li>
        </ul>
      </div>
    </div>
  );
});

export default Popover;
