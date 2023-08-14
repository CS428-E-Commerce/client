import { push } from "connected-react-router";
import dayjs from "dayjs";
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { AvatarPlaceholderSrc, CheckIcon, StarsIcon } from "assets/images";
import CalendarImg from "assets/images/icons/calendar.png";
import Loading from "components/Loading";
import ApiService from "services/api_service";
import { formatCent } from "services/common_service";
import { ToastService } from "services/toast_service";

import classes from "./styles.module.scss";

const MyProfilePage = memo(() => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await ApiService.GET("/api/user");
        setUser(response?.data);

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

  return (
    <div className={classes.container}>
      <main className={classes.main}>
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
                            <span>{course.rate ?? "N/A"}</span>
                            {/* TODO: create stars component for this */}
                            <StarsIcon />
                          </div>
                          <div>({user?.totalCourse} classes taught)</div>
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
    </div>
  );
});

export default MyProfilePage;
