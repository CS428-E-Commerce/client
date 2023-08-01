import { memo, useState } from "react";

import { NavLink } from "react-router-dom";

import classes from "./styles.module.scss";
import {
  CheckIcon,
  CloseRoundedIcon,
  GraduateHatIcon,
  LockIcon,
  StarIcon,
  StarsIcon,
} from "assets/images/icons";
import { Modal } from "react-bootstrap";

const CourseDetail = memo(() => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={classes.main}>
      <div className={classes.leftSection}>
        <header className={classes.pageHeader}>
          <h1 className={classes.pageHeading}>
            Verb Tenses: Vietnamese Grammar mastery
          </h1>
          <span className={classes.pageSubheading}>
            Vietnamese grammar online course
          </span>
        </header>

        <section className={classes.overview}>
          <div className={classes.tutor}>
            <div className={classes.tutorAvatarContainer}>
              <img
                className={classes.tutorAvatar}
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"
                alt=""
              />
            </div>
            <h2 className={classes.name}>Taught by Niusha S.</h2>
            <div className={classes.stats}>
              <StarIcon className={classes.startIcon} />
              <span className={classes.rating}>4.9</span>{" "}
              <span className={classes.classesTaught}>
                &#40;723 classes&#41;
              </span>
            </div>
          </div>

          <div className={classes.thumbnail}>
            <img
              className={classes.img}
              src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80"
              alt=""
            />
          </div>
        </section>

        <section className={classes.aboutThisCourse}>
          <h2 className={classes.aboutHeading}>About this course</h2>
          <p className={classes.courseDescription}>
            This engaging course is designed to propel you towards English
            language mastery in no time. With a unique blend of interactive
            lessons, real-world practice, and expert guidance, we make learning
            English enjoyable and effective. Whether you&apos;re a beginner or
            looking to polish your skills, this is your ticket to confidently
            expressing yourself in the global language. Join our vibrant
            community of learners and embark on a language journey that promises
            to be fun, rewarding, and life-changing. Get ready to unlock new
            opportunities and expand your horizons!
          </p>

          <div className={classes.outlines}>
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
          </div>

          <div className={classes.prerequisites}>
            <h3 className={classes.prerequisitesHeading}>Prerequisites</h3>
            <ul className={classes.prerequisitesList}>
              <li className={classes.prerequisitesItem}>
                <NavLink to="#" className={classes.link}>
                  100 basic words course
                </NavLink>
              </li>
            </ul>
          </div>
        </section>

        <section className={classes.courseTutor}>
          <div className={classes.tutorInfoContainer}>
            <div className={classes.tutorInfo}>
              <div className={classes.tutorAvatarContainer}>
                <img
                  className={classes.tutorAvatar}
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"
                  alt=""
                />
              </div>
              <div>
                <h2 className={classes.tutorName}>Taught by Niusha S.</h2>
                <span className={classes.extraInfo}>
                  On Vinglish since 2018
                </span>
              </div>
            </div>
            <button className={classes.contactBtn}>Contact tutor</button>
          </div>
          <div className={classes.stats}>
            <div className={classes.verified}>
              <CheckIcon className={classes.checkIcon} />
              <span className={classes.verifiedText}>Verified tutor</span>
            </div>
            <div className={classes.reviews}>
              <StarIcon className={classes.starIcon} />
              <span>5 &#40;29 reviews&#41;</span>
            </div>
            <div className={classes.lessonsTaught}>
              <GraduateHatIcon className={classes.graduateHatIcon} />
              <span>1,234 lessons taught</span>
            </div>
          </div>
        </section>

        <section className={classes.testimonials}>
          <h3 className={classes.testimonialsHeading}>Tutor reviews</h3>

          <div className={classes.testimonialList}>
            <div className={classes.testimonial}>
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
                    <h4 className={classes.testimonialAuthorName}>Mark Zuck</h4>
                    <span className={classes.testimonialAuthorOrigin}>
                      United State
                    </span>
                  </div>
                </div>
                <div className={classes.date}>Jun 28, 2023</div>
              </div>
              <div className={classes.testimonialContent}>
                <StarsIcon className={classes.starsIcon} />
                <p className={classes.content}>
                  Best Vietnamese teacher ever. She is understanding and
                  conscientious. Tôi xin cảm ơn cô giáo nhiều lắm.
                </p>
              </div>
            </div>
            <div className={classes.testimonial}>
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
                    <h4 className={classes.testimonialAuthorName}>Mark Zuck</h4>
                    <span className={classes.testimonialAuthorOrigin}>
                      United State
                    </span>
                  </div>
                </div>
                <div className={classes.date}>Jun 28, 2023</div>
              </div>
              <div className={classes.testimonialContent}>
                <StarsIcon className={classes.starsIcon} />
                <p className={classes.content}>
                  Best Vietnamese teacher ever. She is understanding and
                  conscientious. Tôi xin cảm ơn cô giáo nhiều lắm.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div>
        <div className={classes.sidePanelContainer}>
          <div className={classes.sidePanelContent}>
            <div className={classes.classPrice}>
              <span className={classes.price}>$6.00</span>
              <span className={classes.divider}>/</span>
              <span className={classes.unit}>class</span>
            </div>
            <div className={classes.upcomingClasses}>UPCOMING CLASSES</div>
            <div className={classes.metadataList}>
              <div className={classes.metadata}>
                <div className={classes.classDate}>
                  <div className={classes.date}>Thu, Jun 30</div>
                  <div className={classes.time}>
                    10:00 - 10:55 &#40;GMT+7&#41;
                  </div>
                  <div className={classes.remain}>Only 2 slots remain</div>
                </div>
                <div className={classes.cta}>
                  <div className={classes.price}>$6.00</div>
                  <button
                    className={classes.enrollBtn}
                    onClick={() => setOpenModal(true)}
                  >
                    Enroll
                  </button>
                </div>
              </div>
              <div className={classes.metadata}>
                <div className={classes.classDate}>
                  <div className={classes.date}>Thu, Jun 30</div>
                  <div className={classes.time}>
                    10:00 - 10:55 &#40;GMT+7&#41;
                  </div>
                  <div className={classes.remain}>Only 2 slots remain</div>
                </div>
                <div className={classes.cta}>
                  <div className={classes.price}>$6.00</div>
                  <button
                    className={classes.enrollBtn}
                    onClick={() => setOpenModal(true)}
                  >
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={openModal}>
        <Modal.Header>
          <CloseRoundedIcon style={{ visibility: "hidden" }} />
          <span className={classes.modalHeading}>Buy now</span>
          <CloseRoundedIcon onClick={() => setOpenModal(false)} />
        </Modal.Header>
        <Modal.Body className={classes.modalBody}>
          <div className={classes.courseInfoContainer}>
            <div className={classes.thumbnail}>
              <img
                className={classes.img}
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"
                alt=""
              />
            </div>
            <div className={classes.courseInfo}>
              <div className={classes.courseTitle}>
                Verb Tenses: Vietnamese Grammar mastery
              </div>
              <div className={classes.courseDate}>
                Thu, Jun 30 ∙ 10:00 - 10:55 &#40;GMT+7&#41;
              </div>
            </div>
          </div>
          <div className={classes.orderDetails}>
            <div className={classes.orderDetailsHeading}>Order details</div>
            <div className={classes.orderDetail}>
              <span>$6.00 x 1 class</span>
              <span>$6.00</span>
            </div>
            <div className={classes.total}>
              <span className={classes.text}>Total</span>
              <span className={classes.value}>$6.00</span>
            </div>
          </div>
          <div className={classes.cardDetails}>
            <div className={classes.cardDetailsHeading}>Card details</div>

            <div className={classes.creditCardInputGroup}>
              <label className={classes.text}>Credit Card Number</label>
              <input
                className={classes.input}
                placeholder="xxxx xxxx xxxx xxxx"
              />
            </div>

            <div className={classes.metadataInputGroup}>
              <div className={classes.expiryDateContainer}>
                <label className={classes.expiryDateLabel}>Expiry Date</label>
                <input
                  className={classes.expiryDateInput}
                  placeholder="mm / yy"
                />
              </div>
              <div className={classes.cvvContainer}>
                <label className={classes.cvvLabel}>CVV</label>
                <input className={classes.cvvInput} placeholder="xxx" />
              </div>
            </div>

            <div className={classes.saveCardCheckboxGroup}>
              <input className={classes.checkbox} type="checkbox" />
              <label className={classes.label}>
                Save this card for future payments
              </label>
            </div>
          </div>
          <div className={classes.payment}>
            <button className={classes.btn}>Pay $6.00</button>
            <div className={classes.securePaymentContainer}>
              <LockIcon />
              <span>Secure payment</span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
});

export default CourseDetail;
