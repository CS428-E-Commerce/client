import { push } from "connected-react-router";
import dayjs from "dayjs";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import {
  AvatarPlaceholderSrc,
  CheckIcon,
  CloseRoundedIcon,
} from "assets/images";
import CalendarImg from "assets/images/icons/calendar.png";
import Loading from "components/Loading";
import ApiService from "services/api_service";
import { formatCent, formatRate } from "services/common_service";
import { ToastService } from "services/toast_service";

import classes from "./styles.module.scss";
import { Rating } from "@mui/material";
import Button from "components/Button";
import { Modal } from "react-bootstrap";

const MyProfilePage = memo(() => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const avatar = useRef();

  useEffect(() => {
    const init = async () => {
      try {
        const response = await ApiService.GET("/api/user");
        setUser(response?.data);
        setData(response?.data);

        const coursesResponse = await ApiService.GET("/api/courses", {
          userId: response?.data?.id,
        });

        for (const course of coursesResponse?.data) {
          const discussionResponse = await ApiService.GET("/api/discussion", {
            courseId: course.courseId,
            offset: 0,
            limit: 0,
          });

          let rate = 0;
          for (const review of discussionResponse?.data) {
            rate += +review.rate;
          }
          rate /= discussionResponse?.data?.length;
          if (Number.isNaN(rate)) rate = "N/A";
          course.rate = rate;
        }
        setCourses(coursesResponse?.data ?? []);
      } catch (error) {
        console.log(error);
        ToastService.error("Sorry, an error occurred.");
      }
    };

    init();
  }, []);

  const navigateToCourse = courseId => {
    dispatch(push(`/courses/${courseId}`));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await ApiService.PUT(`/api/user`, { ...data, avatar: avatar?.current });
    ToastService.success("Successfully update profile info");
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setData(data => ({ ...data, [name]: value }));
  };

  const encodeImageToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.onload = event => {
      const encodedImage =
        "data:" + file.type + ";base64," + event.target.result.split(",")[1];
      callback(encodedImage);
    };
    reader.readAsDataURL(file);
  };

  const onChangeImage = event => {
    const selectedFile = event.target.files[0];
    encodeImageToBase64(selectedFile, encodedImageString => {
      avatar.current = encodedImageString;
    });
  };

  return (
    <div className={classes.container}>
      <main className={classes.main}>
        <Button className="mb-4" onClick={() => setModalOpen(true)}>
          Edit Profile
        </Button>
        {user ? (
          <div className={classes.twoColumnLayout}>
            <div className={classes.leftColumn}>
              <section className={classes.userInfo}>
                <div>
                  <div>
                    {/* TODO: get role from api */}
                    <span className={classes.userRole}>Student</span>
                    <h1 className={classes.username}>
                      {user?.username ?? "N/A"}
                    </h1>
                  </div>
                </div>
              </section>

              <section className={classes.aboutMeSection}>
                <h2 className={classes.aboutMeHeading}>About me</h2>
                <p className={classes.aboutMeParagraph}>
                  {user?.description ?? "N/A"}
                </p>
              </section>

              <section className={classes.coursesSection}>
                <h2 className={classes.coursesHeading}>Courses Taken</h2>

                <div className={classes.courses}>
                  {courses.map(course => (
                    <div
                      className={classes.courseCard}
                      key={course.courseId}
                      onClick={() => navigateToCourse(course.courseId)}
                    >
                      <div className={classes.coverImageWrapper}>
                        <img
                          className={classes.coverImage}
                          src={course.banner}
                          alt={course.title}
                        />
                      </div>

                      <div className={classes.courseBody}>
                        <h3 className={classes.courseTitle}>{course.title}</h3>

                        <div className={classes.courseInfo}>
                          <div className={classes.courseAuthor}>
                            <span>With {user?.coachInfo?.username}</span>
                            <CheckIcon />
                          </div>
                          <div className={classes.courseReview}>
                            <span>{formatRate(course.rate) ?? "N/A"}</span>
                            <Rating value={course.rate} readOnly />
                          </div>
                          <div>
                            ({user?.coachInfo?.totalCourse} classes taught)
                          </div>
                          <div className={classes.courseDate}>
                            <img
                              className={classes.calendarIcon}
                              src={CalendarImg}
                              alt="Calendar icon"
                            />
                            <span className={classes.date}>
                              {dayjs(course?.schedules?.[0]?.startTime).format(
                                "ddd, HH:mm - ",
                              )}
                              {dayjs(course?.schedules?.[0]?.endTime).format(
                                "HH:mm",
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={classes.courseFooter}>
                        <div>
                          <span className={classes.coursePrice}>
                            {formatCent(course.cost)}
                          </span>{" "}
                          <span>/ class</span>
                        </div>
                        <div className={classes.seatRemain}>
                          {/* TODO: API to return total attendees of the course */}
                          {course.maxSlot} slots remain
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className={classes.rightColumn}>
              <div>
                <img
                  className={classes.userAvatar}
                  src={user?.avatar ?? AvatarPlaceholderSrc}
                  alt="Avatar"
                />
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </main>

      <Modal show={modalOpen}>
        <Modal.Header>
          <CloseRoundedIcon style={{ visibility: "hidden" }} />
          <span className={classes.modalHeading}>Edit Profile</span>
          <CloseRoundedIcon onClick={() => setModalOpen(false)} />
        </Modal.Header>
        <Modal.Body className={classes.modalBody}>
          <form onSubmit={handleSubmit}>
            <div className={classes.formGroup}>
              <label className={classes.inputLabel}>Username</label>
              <input
                className={classes.input}
                name="username"
                value={data.username || ""}
                onChange={handleChange}
              />
            </div>
            <div className={classes.formGroup}>
              <label className={classes.inputLabel}>Description</label>
              <textarea
                className={classes.input}
                name="description"
                value={data.description || ""}
                onChange={handleChange}
              />
            </div>
            <div className={classes.formGroup}>
              <label className={classes.inputLabel}>Avatar</label>
              <input type="file" accept="image/*" onChange={onChangeImage} />
              {/* <input
                className={classes.input}
                name="avatar"
                value={data.avatar || ""}
                onChange={handleChange}
              /> */}
            </div>
            <div className={classes.formGroup}>
              <label className={classes.inputLabel}>Address</label>
              <input
                className={classes.input}
                name="address"
                value={data.address || ""}
                onChange={handleChange}
              />
            </div>
            <div className={classes.formGroup}>
              <label className={classes.inputLabel}>Phone</label>
              <input
                className={classes.input}
                name="phone"
                value={data.phone || ""}
                onChange={handleChange}
              />
            </div>

            <Button width="100%">Save</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
});

export default MyProfilePage;
