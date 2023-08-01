import { CalendarImgSrc, StarIcon } from "assets/images/icons";

import classes from "./styles.module.scss";
import { memo } from "react";

const Card = memo(({ onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className={classes.card}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={classes.thumbnail}>
        <img
          src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80"
          alt=""
        />
      </div>
      <div className={classes.content}>
        <div className={classes.contentHeader}>
          <h2 className={classes.contentHeading}>
            Verb Tenses: Vietnamese Grammar mastery
          </h2>
          <div className={classes.pricing}>
            <span className={classes.coursePrice}>$5.99</span>
            <span className={classes.priceDivider}>/</span>
            <span>class</span>
          </div>
        </div>
        <div className={classes.contentDescription}>
          This course is designed to help students improve their understanding
          and use of verb tenses in English. Students will learn about the
          various verb tenses in English, including simple present, present
          continuous, simple past, past continuous, present perfect, past
          perfect, and future tenses. Through interactive activities, quizzes,
          and exercises, students will practice using these verb tenses
          correctly in spoken and written communication. By the end of the
          course, students will have a solid understanding of the different verb
          tenses in English and will be able to use them correctly in spoken and
          written communication.
        </div>
        <div className={classes.courseStartDate}>
          <img
            className={classes.calendarIcon}
            src={CalendarImgSrc}
            alt="Calendar"
          />
          <span className={classes.date}>Wed, 18:00 - 18:55</span>
        </div>
        <div className={classes.contentFooter}>
          <div className={classes.tutor}>
            <div className={classes.tutorInfo}>
              <img
                className={classes.tutorAvatar}
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
              />
              <div>
                <h3 className={classes.tutorName}>Thanh H.</h3>
                <div className={classes.rating}>
                  <span className={classes.rate}>5</span>
                  <StarIcon className={classes.starIcon} />
                  <span className={classes.classesTaught}>
                    • 1,390 classes taught
                  </span>
                </div>
              </div>
            </div>
            <div className={classes.slotsRemainContainer}>
              <span>Only</span>
              <span className={classes.slotsRemain}>1 slots remain</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Card;
