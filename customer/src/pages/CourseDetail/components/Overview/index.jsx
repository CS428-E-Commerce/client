import { memo } from "react";

import { StarsIcon } from "assets/images";
import { formatNumber } from "services/common_service";

import classes from "./styles.module.scss";

const Overview = memo(
  ({
    coachAvatar,
    coachName,
    coachTotalRate,
    coachTotalCourse,
    courseBanner,
  }) => {
    return (
      <section className={classes.overview}>
        <div className={classes.tutor}>
          <div className={classes.tutorAvatarContainer}>
            <img
              className={classes.tutorAvatar}
              src={coachAvatar}
              alt={coachName}
            />
          </div>
          <h2 className={classes.name}>Taught by {coachName}</h2>
          <div className={classes.stats}>
            <StarsIcon className={classes.startIcon} />
            <span className={classes.rating}>{coachTotalRate}</span>{" "}
            <span className={classes.classesTaught}>
              &#40;{formatNumber(coachTotalCourse)} classes&#41;
            </span>
          </div>
        </div>

        {courseBanner && (
          <div className={classes.banner}>
            <img className={classes.img} src={courseBanner} alt="" />
          </div>
        )}
      </section>
    );
  },
);

export default Overview;
