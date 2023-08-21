import { Rating } from "@mui/material";
import { memo } from "react";

import { AvatarPlaceholderSrc, StarsIcon } from "assets/images";

import classes from "./styles.module.scss";

const Testimonial = memo(({ discussions }) => {
  return (
    <section className={classes.testimonials}>
      <h3 className={classes.testimonialsHeading}>Tutor reviews</h3>

      <div className={classes.testimonialList}>
        {discussions.map(discussion => (
          <div className={classes.testimonial} key={discussion.id}>
            <div className={classes.testimonialInfo}>
              <div className={classes.testimonialAuthorContainer}>
                <div className={classes.testimonialAvatarContainer}>
                  <img
                    className={classes.testimonialAvatar}
                    src={discussion.avatar ?? AvatarPlaceholderSrc}
                    alt=""
                  />
                </div>
                <div className={classes.testimonialAutor}>
                  <h4 className={classes.testimonialAuthorName}>
                    {discussion?.username ?? "N/A"}
                  </h4>
                  <span className={classes.testimonialAuthorOrigin}>
                    United State
                  </span>
                </div>
              </div>
              <div className={classes.date}>Jun 28, 2023</div>
            </div>
            <div className={classes.testimonialContent}>
              <Rating
                name="read-only"
                value={parseInt(discussion.rate)}
                readOnly
              />
              <p className={classes.content}>{discussion?.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default Testimonial;
