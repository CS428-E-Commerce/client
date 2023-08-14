import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { push } from "connected-react-router";
import dayjs from "dayjs";
import { memo, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {
  AvatarPlaceholderSrc,
  CloseRoundedIcon,
  StarsIcon,
} from "assets/images";
import useQuery from "hooks/useQuery";
import { setLoading } from "redux/reducers/Status/actionTypes";
import ApiService from "services/api_service";
import { formatCent } from "services/common_service";
import { ToastService } from "services/toast_service";

// Stripe

import AboutThisCourse from "./components/AboutThisCourse";
import CourseInfo from "./components/CourseInfo";
import CourseTutor from "./components/CourseTutor";
import Header from "./components/Header";
import Overview from "./components/Overview";
import PaymentForm from "./components/PaymentForm";
import Testimonial from "./components/Testimonial";
import classes from "./styles.module.scss";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);

const CourseDetail = memo(() => {
  const dispatch = useDispatch();
  const query = useQuery();
  const params = useParams();

  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [discussions, setDiscussions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("prepayment");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const init = async () => {
      dispatch(setLoading(true));
      try {
        const response = await ApiService.GET(
          `/api/courses/detail/${params.courseId}/${query.get("coachId")}`, // id của học viên nếu có
        );
        setData(response);

        const discussionResponse = await ApiService.GET("/api/discussion", {
          courseId: response.course.id,
          offset: 0,
          limit: 0,
        });
        setDiscussions(discussionResponse?.data ?? []);
      } catch (error) {
        console.error(error);
        ToastService.error("Sorry, an error occurred.");
      } finally {
        dispatch(setLoading(false));
      }
    };

    init();
  }, []);

  useEffect(() => {
    const initPayment = async () => {
      if (!data) return;
      try {
        const user = await ApiService.GET("/api/user");
        setUser(user);

        const attendees = await ApiService.GET(
          `/api/attendees/${data.course.id}`,
        );
        const isUserAttending = attendees.data?.find(
          attendee =>
            attendee.userId === (user.data?.id ?? user.data?.coachInfo?.id),
        );

        if (isUserAttending) setModalType("payment-successfully");

        const intentResponse = await ApiService.GET(
          `/api/payment/${data.course.id}`,
        );
        setClientSecret(intentResponse.data?.client_secret);
      } catch (error) {
        console.error(error);
        setClientSecret("");
      }
    };

    initPayment();
  }, [data]);

  const slotRemains =
    data?.course?.maxSlot ?? 0 - data?.course?.attendeeNumber ?? 0;

  const options = {
    clientSecret,
  };

  return (
    <div className={classes.main}>
      <div className={classes.leftSection}>
        <Header
          courseTitle={data?.course?.title}
          courseCode={data?.course?.code}
        />

        <Overview
          coachAvatar={data?.coach_detail?.avatar ?? AvatarPlaceholderSrc}
          coachName={data?.coach_detail?.username ?? "N/A"}
          coachTotalRate={data?.coach?.totalRate ?? "N/A"}
          coachTotalCourse={data?.coach?.totalCourse ?? "N/A"}
          courseBanner={data?.course?.banner}
        />

        <AboutThisCourse courseDescription={data?.course?.description} />

        <CourseTutor
          coachAvatar={data?.coach_detail?.avatar}
          coachName={data?.coach_detail?.username}
          coachYearExperience={data?.coach?.yearExperience}
          coachRateTurn={data?.coach?.rateTurn}
          coachTotalCourse={data?.coach?.totalCourse}
        />

        <Testimonial discussions={discussions} />
      </div>

      <CourseInfo
        courseCost={data?.course?.cost}
        courseSchedule={data?.schedule}
        slotRemains={slotRemains}
        setOpenModal={setOpenModal}
      />

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
              {clientSecret ? (
                <Elements stripe={stripePromise} options={options}>
                  <PaymentForm
                    user={user}
                    course={data?.course}
                    setModalType={setModalType}
                  />
                </Elements>
              ) : (
                <div>Please log in before registering the course</div>
              )}
            </>
          )}
          {modalType === "payment-successfully" && (
            <div className={classes.payment}>
              <div className="text-xl">You have registered this class</div>
              <button
                className={classes.btn}
                onClick={() => dispatch(push("/my-course"))}
              >
                Go to My Courses
              </button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
});

export default CourseDetail;
