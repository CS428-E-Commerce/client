import clsx from "clsx";

import { PopupCaretIcon } from "assets/images";

import classes from "./styles.module.scss";
import { memo } from "react";

const Popover = memo(
  ({ show, tutorName, tutorAvatar, tutorCertificates, tutorLanguages }) => {
    return (
      <div className={clsx(classes.popover, { [classes.show]: show })}>
        <PopupCaretIcon className={classes.popoverCaretIcon} />
        <img
          className={classes.tutorAvatar}
          src={tutorAvatar}
          alt=""
        />
        <div className={classes.tutorInfo}>
          <h3 className={classes.tutorName}>{tutorName}</h3>
          <ul>
            {tutorCertificates.map(certificate => (
              <li key={certificate}>{certificate}</li>
            ))}
          </ul>
        </div>
        <div className={classes.speak}>
          <h3 className={classes.speakHeading}>Speaks</h3>
          <ul>
            {tutorLanguages.map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
);

export default Popover;
