import clsx from "clsx";
import { memo } from "react";

import { PopupCaretIcon } from "assets/images";

import classes from "./styles.module.scss";

const Popover = memo(
  ({ show, tutorName, tutorAvatar, tutorCertificates, tutorSkills }) => {
    return (
      <div className={clsx(classes.popover, { [classes.show]: show })}>
        <PopupCaretIcon className={classes.popoverCaretIcon} />
        <img className={classes.tutorAvatar} src={tutorAvatar} alt="" />
        <div className={classes.tutorInfo}>
          <h3 className={classes.tutorName}>{tutorName}</h3>
          <ul>
            {tutorCertificates?.map(({ id, certificate }) => (
              <li key={id}>{certificate}</li>
            ))}
          </ul>
        </div>
        {tutorSkills?.length > 0 && (
          <div className={classes.speak}>
            <h3 className={classes.speakHeading}>Skills</h3>
            <ul>
              {tutorSkills?.map(({ id, skill }) => (
                <li key={id}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
);

export default Popover;
