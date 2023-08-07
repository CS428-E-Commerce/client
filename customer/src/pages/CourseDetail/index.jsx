import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import dayjs from "dayjs";
import { memo, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

import {
  CheckIcon,
  CloseRoundedIcon,
  GraduateHatIcon,
  StarIcon,
  StarsIcon,
} from "assets/images";
import useQuery from "hooks/useQuery";
import { setLoading } from "redux/reducers/Status/actionTypes";
import ApiService from "services/api_service";
import { formatNumber } from "services/common_service";
import { ToastService } from "services/toast_service";

// Stripe

import PaymentForm from "./PaymentForm";
import classes from "./styles.module.scss";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);

const CourseDetail = memo(() => {
  const dispatch = useDispatch();
  const query = useQuery();
  const params = useParams();

  const [data, setData] = useState({});
  const [user, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("prepayment");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const init = async () => {
      if (!data.course) return;
      dispatch(setLoading(true));
      try {
        const response = await ApiService.GET(
          `/api/courses/detail/${params.courseId}/${query.get("coachId")}`,
        );
        setData({
          coach: response.coach,
          coach_cert: response.coach_cert,
          coach_skill: response.coach_skill,
          course: response.course,
          schedule: response.schedule,
        });

        const user = await ApiService.GET("/api/user");
        setUser(user);

        const attendees = await ApiService.GET(
          `/api/attendees/${response.course.id}`,
        );
        const isUserAttending = attendees.data.find(
          attendee => attendee.userId === user.data.id,
        );
        if (isUserAttending) setModalType("payment-successfully");

        const intentResponse = await ApiService.GET(
          `/api/payment/${response.course.id}`,
        );
        setClientSecret(intentResponse.data?.client_secret);
      } catch (error) {
        console.error(error);
        ToastService.error("Sorry, an error occurred.");
      } finally {
        dispatch(setLoading(false));
      }
    };

    init();
  }, []);

  const slotRemains = data.course?.maxSlot - data.course?.attendeeNumber;

  const options = {
    clientSecret,
  };

  return (
    <div className={classes.main}>
      <div className={classes.leftSection}>
        <header className={classes.pageHeader}>
          <h1 className={classes.pageHeading}>{data.course?.title}</h1>
          <span className={classes.pageSubheading}>{data.course?.code}</span>
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
              <span className={classes.rating}>
                {data.coach?.totalRate}
              </span>{" "}
              <span className={classes.classesTaught}>
                &#40;{formatNumber(data.coach?.totalCourse)} classes&#41;
              </span>
            </div>
          </div>

          <div className={classes.thumbnail}>
            <img className={classes.img} src={data.course?.banner} alt="" />
          </div>
        </section>

        <section className={classes.aboutThisCourse}>
          <h2 className={classes.aboutHeading}>About this course</h2>
          <p className={classes.courseDescription}>
            {data.course?.description}
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
                  On Vinglish since{" "}
                  {dayjs()
                    .subtract(data.coach?.yearExperience ?? 0, "year")
                    .year()}
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
              <span>
                5 &#40;{formatNumber(data.coach?.rateTurn)} reviews&#41;
              </span>
            </div>
            <div className={classes.lessonsTaught}>
              <GraduateHatIcon className={classes.graduateHatIcon} />
              <span>
                {formatNumber(data.coach?.totalCourse)} lessons taught
              </span>
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
              <span className={classes.price}>${data.course?.cost}</span>
              <span className={classes.divider}>/</span>
              <span className={classes.unit}>class</span>
            </div>
            <div className={classes.upcomingClasses}>UPCOMING CLASSES</div>
            <div className={classes.metadataList}>
              {data.schedule?.map(({ startTime, endTime }, index) => {
                return (
                  <div key={index} className={classes.metadata}>
                    <div className={classes.classDate}>
                      <div className={classes.date}>
                        {dayjs(startTime).format("ddd, MMM D")}
                      </div>
                      <div className={classes.time}>
                        {dayjs(startTime).format("HH:mm")} -{" "}
                        {dayjs(endTime).format("HH:mm")}
                        {/* 10:00 - 10:55 &#40;GMT+7&#41; TIME ZONE WILL BE LEFT FOR LATER */}
                      </div>
                      <div className={classes.remain}>
                        Only {slotRemains < 0 ? 0 : slotRemains} slots remain
                      </div>
                    </div>
                    <div className={classes.cta}>
                      <div className={classes.price}>${data.course?.cost}</div>
                      <button
                        className={classes.enrollBtn}
                        onClick={() => setOpenModal(true)}
                      >
                        Enroll
                      </button>
                    </div>
                  </div>
                );
              })}
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

          {modalType === "prepayment" && (
            <>
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
              <Elements stripe={stripePromise} options={options}>
                <PaymentForm
                  user={user}
                  course={data.course}
                  setModalType={setModalType}
                />
              </Elements>
            </>
          )}
          {modalType === "payment-successfully" && (
            <div className={classes.payment}>
              <div className="text-xl">You have registered this class</div>
              <button className={classes.btn}>Go to My Classes</button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
});

export default CourseDetail;
