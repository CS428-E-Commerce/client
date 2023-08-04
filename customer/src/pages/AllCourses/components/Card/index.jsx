import { CalendarImgSrc, StarIcon } from "assets/images/icons";

import classes from "./styles.module.scss";
import { memo } from "react";

const Card = memo(
  ({
    onMouseEnter,
    onMouseLeave,
    thumbnailSrc,
    courseTitle,
    coursePrice,
    courseDescription,
    courseStartDate,
    tutorAvatar,
    tutorName,
    tutorRating,
    tutorClassesTaught,
    slotRemain,
  }) => {
    return (
      <div
        className={classes.card}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className={classes.thumbnail}>
          <img style={{height: "224px"}} src={thumbnailSrc} alt="" />
        </div>
        <div className={classes.content}>
          <div className={classes.contentHeader}>
            <h2 className={classes.contentHeading}>{courseTitle}</h2>
            <div className={classes.pricing}>
              <span className={classes.coursePrice}>${coursePrice}</span>
              <span className={classes.priceDivider}>/</span>
              <span>class</span>
            </div>
          </div>
          <div className={classes.contentDescription}>{courseDescription}</div>
          <div className={classes.courseStartDate}>
            <img
              className={classes.calendarIcon}
              src={CalendarImgSrc}
              alt="Calendar"
            />
            <span className={classes.date}>{courseStartDate}</span>
          </div>
          <div className={classes.contentFooter}>
            <div className={classes.tutor}>
              <div className={classes.tutorInfo}>
                <img className={classes.tutorAvatar} src={tutorAvatar} alt="" />
                <div>
                  <h3 className={classes.tutorName}>{tutorName}</h3>
                  <div className={classes.rating}>
                    <span className={classes.rate}>{tutorRating}</span>
                    <StarIcon className={classes.starIcon} />
                    <span className={classes.classesTaught}>
                      • {tutorClassesTaught} classes taught
                    </span>
                  </div>
                </div>
              </div>
              <div className={classes.slotsRemainContainer}>
                <span>Only</span>
                <span className={classes.slotsRemain}>
                  {slotRemain} slots remain
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Card;
