import dayjs from "dayjs";
import { memo } from "react";

import {
  AvatarPlaceholderSrc,
  CheckIcon,
  GraduateHatIcon,
  StarIcon,
} from "assets/images";
import { formatNumber, formatRate } from "services/common_service";

import classes from "./styles.module.scss";

const CourseTutor = memo(
  ({
    coachAvatar,
    coachName,
    coachYearExperience,
    coachRateTurn,
    coachTotalCourses,
    coachEmail,
    totalRate,
  }) => {
    return (
      <section className={classes.courseTutor}>
        <div className={classes.tutorInfoContainer}>
          <div className={classes.tutorInfo}>
            <div className={classes.tutorAvatarContainer}>
              <img
                className={classes.tutorAvatar}
                src={coachAvatar ?? AvatarPlaceholderSrc}
                alt=""
              />
            </div>
            <div>
              <h2 className={classes.tutorName}>Taught by {coachName}</h2>
              <span className={classes.extraInfo}>
                On Vinglish since{" "}
                {dayjs()
                  .subtract(coachYearExperience ?? 0, "year")
                  .year()}
              </span>
            </div>
          </div>
          <a href={`mailto:${coachEmail}`} className={classes.contactBtn}>
            Contact tutor
          </a>
        </div>
        <div className={classes.stats}>
          <div className={classes.verified}>
            <CheckIcon className={classes.checkIcon} />
            <span className={classes.verifiedText}>Verified tutor</span>
          </div>
          <div className={classes.reviews}>
            <StarIcon className={classes.starIcon} />
            <span>
              {formatRate(totalRate)} &#40;{formatNumber(coachRateTurn)}{" "}
              reviews&#41;
            </span>
          </div>
          <div className={classes.lessonsTaught}>
            <GraduateHatIcon className={classes.graduateHatIcon} />
            <span>{formatNumber(coachTotalCourses)} lessons taught</span>
          </div>
        </div>
      </section>
    );
  },
);

export default CourseTutor;
