import { memo } from "react";

import { StarsIcon } from "assets/images";

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
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"
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
              <StarsIcon className={classes.starsIcon} />
              <p className={classes.content}>{discussion?.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default Testimonial;
