import { memo } from "react";

import classes from "./styles.module.scss";

const AboutThisCourse = memo(({ courseDescription }) => {
  return (
    <section className={classes.aboutThisCourse}>
      <h2 className={classes.aboutHeading}>About this course</h2>
      <p className={classes.courseDescription}>{courseDescription}</p>

      {/* <div className={classes.outlines}>
      <h3 className={classes.outlineHeading}>What you will learn</h3>
      <ul className={classes.outlineList}>
        <li>
          The intricacies of Vietnamese verb tenses for accurate
          expression of actions in different time frames.
        </li>
        <li>
          How to confidently use present, past, future, perfect,
          progressive, and conditional tenses.
        </li>
        <li>
          The appropriate forms, structures, and conjugations for each
          verb tense to enhance your communication skills in Vietnamese.
        </li>
      </ul>
    </div> */}

      {/* <div className={classes.prerequisites}>
      <h3 className={classes.prerequisitesHeading}>Prerequisites</h3>
      <ul className={classes.prerequisitesList}>
        <li className={classes.prerequisitesItem}>
          <NavLink to="#" className={classes.link}>
            100 basic words course
          </NavLink>
        </li>
      </ul>
    </div> */}
    </section>
  );
});

export default AboutThisCourse;
