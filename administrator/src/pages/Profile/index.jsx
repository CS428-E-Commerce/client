import { goBack, push } from "connected-react-router";
import dayjs from "dayjs";
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { AvatarPlaceholderSrc, CheckIcon, StarsIcon } from "assets/images";
import CalendarImg from "assets/images/icons/calendar.png";
import Loading from "components/Loading";
import ApiService from "services/api_service";
import { formatCent, formatNumber } from "services/common_service";
import { ToastService } from "services/toast_service";

import classes from "./styles.module.scss";
import { Button } from "@mui/material";

const TutorProfilePage = memo(() => {
  const dispatch = useDispatch();
  const { tutorId: id } = useParams();
  const [data, setData] = useState(null);
  const [rateTurn, setRateTurn] = useState(null);

  useEffect(() => {
    ApiService.GET(`/api/coach/${id}`)
      .then(async response => {
        let rateTurn = 0;

        for (const course of response?.data?.courses) {
          const discussionResponse = await ApiService.GET("/api/discussion", {
            courseId: course.id,
            offset: 0,
            limit: 0,
          });

          let rate = 0;
          for (const review of discussionResponse?.data) {
            rate += +review.rate;
            rateTurn++;
          }
          rate /= discussionResponse?.data?.length;
          if (Number.isNaN(rate)) rate = "N/A";
          course.rate = rate;
        }

        setData(response?.data);
        setRateTurn(rateTurn);
      })
      .catch(error => {
        console.log(error);
        ToastService.error("Sorry, an error occurred.");
      });
  }, []);

  return (
    <div className={classes.container}>
      <Button variant="outlined" onClick={() => { dispatch(goBack()) }}>Back</Button>
      <main className={classes.main}>
        {data ? (
          <div className={classes.twoColumnLayout}>
            <div className={classes.leftColumn}>
              <section className={classes.userInfo}>
                <div>
                  <div>
                    <span className={classes.userRole}>Tutor</span>
                    <h1 className={classes.username}>
                      {data?.coachInfo?.username ?? "N/A"}
                    </h1>
                    <span className={classes.shortDescription}>
                      5 years teaching experience
                    </span>
                  </div>

                  <div className={classes.statBlock}>
                    <div className={classes.stat}>
                      <span className={classes.statTitle}>Students</span> <br />
                      <span className={classes.statAmount}>
                        {formatNumber(data?.totalStudent)}
                      </span>
                    </div>

                    <div className={classes.stat}>
                      <span className={classes.statTitle}>Classes</span> <br />
                      <span className={classes.statAmount}>
                        {formatNumber(data?.totalCourse)}
                      </span>
                    </div>

                    <div className={classes.stat}>
                      <span className={classes.statTitle}>Reviews</span> <br />
                      <span className={classes.statAmount}>
                        {rateTurn ?? "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <section className={classes.aboutMeSection}>
                <h2 className={classes.aboutMeHeading}>About me</h2>
                <p className={classes.aboutMeParagraph}>
                  {data?.coachInfo?.description}
                </p>
              </section>

              <section className={classes.coursesSection}>
                <h2 className={classes.coursesHeading}>My Courses</h2>
                <div className={classes.courses}>
                  {data?.courses
                    ?.filter(course => course.status === "active")
                    .map(course => {
                      return (
                        <div
                          className={classes.courseCard}
                          key={course.id}
                          onClick={() =>
                            dispatch(push(`/course/${course?.id}?coachId=${course?.coachId}`))
                          }
                        >
                          <div className={classes.coverImageWrapper}>
                            <img
                              className={classes.coverImage}
                              src={course.banner}
                              alt={course.title}
                            />
                          </div>

                          <div className={classes.courseBody}>
                            <h3 className={classes.courseTitle}>
                              {course.title}
                            </h3>

                            <div className={classes.courseInfo}>
                              <div className={classes.courseAuthor}>
                                <span>With {data?.coachInfo?.username}</span>
                                <CheckIcon />
                              </div>
                              <div className={classes.courseReview}>
                                <span>{course.rate ?? "N/A"}</span>
                                {/* TODO: create stars component for this */}
                                <StarsIcon />
                              </div>
                              <div>({data?.totalCourse} classes taught)</div>
                              <div className={classes.courseDate}>
                                <img
                                  className={classes.calendarIcon}
                                  src={CalendarImg}
                                  alt="Calendar icon"
                                />
                                <span className={classes.date}>
                                  {dayjs(
                                    course?.schedules?.[0]?.startTime,
                                  ).format("ddd, HH:mm - ")}
                                  {dayjs(
                                    course?.schedules?.[0]?.endTime,
                                  ).format("HH:mm")}
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
                      );
                    })}
                </div>
              </section>
            </div>

            <div className={classes.rightColumn}>
              <div>
                <img
                  className={classes.userAvatar}
                  src={data?.coachInfo?.avatar ?? AvatarPlaceholderSrc}
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

export default TutorProfilePage;
