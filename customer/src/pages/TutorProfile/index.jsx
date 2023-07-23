import { memo, useEffect, useState } from "react";
import classes from "./styles.module.scss";
import { StarsIcon, CheckIcon } from "assets/images/icons";
import CalendarImg from "assets/images/icons/calendar.png";
import mockupCourseCoverImg1 from "assets/images/mockup-avatars/vietnamese.png";
import placeholderAvatarImage from "assets/images/placeholder-avatar.jpeg";
import ApiService from "services/api_service";
import { useParams } from "react-router-dom";
import { ToastService } from "services/toast_service";
import Loading from "components/Loading";

const TutorProfilePage = memo(() => {
  const { id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    ApiService.GET(`/api/coach/${id}`)
      .then(response => {
        setData(response?.data);
      })
      .catch(error => {
        console.log(error);
        ToastService.error("Sorry, an error occurred.");
      });
  }, []);

  return (
    <div className={classes.container}>
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
                      <span className={classes.statAmount}>12,345</span>
                    </div>

                    <div className={classes.stat}>
                      <span className={classes.statTitle}>Classes</span> <br />
                      <span className={classes.statAmount}>1,345</span>
                    </div>

                    <div className={classes.stat}>
                      <span className={classes.statTitle}>Reviews</span> <br />
                      <span className={classes.statAmount}>1,345</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className={classes.aboutMeSection}>
                <h2 className={classes.aboutMeHeading}>About me</h2>
                <p className={classes.aboutMeParagraph}>
                  Hello! My name is Niusha, and I&apos;m a passionate Vietnamese
                  tutor dedicated to helping students learn and master the
                  beautiful Vietnamese language. With years of experience and a
                  deep love for teaching, I am excited to share my knowledge and
                  cultural insights with learners from all backgrounds.
                </p>
              </section>

              <section className={classes.coursesSection}>
                <h2 className={classes.coursesHeading}>My Courses</h2>
                <div className={classes.courses}>
                  <div className={classes.courseCard}>
                    <div className={classes.coverImageWrapper}>
                      <img src={mockupCourseCoverImg1} alt="" />
                    </div>

                    <div className={classes.courseBody}>
                      <h3 className={classes.courseTitle}>
                        Verb Tenses: Vietnamese Grammar mastery
                      </h3>

                      <div className={classes.courseInfo}>
                        <div className={classes.courseAuthor}>
                          <span>With Niusha S.</span>
                          <CheckIcon />
                        </div>
                        <div className={classes.courseReview}>
                          <span>5</span>
                          <StarsIcon />
                        </div>
                        <div>(1,234 classes taught)</div>
                        <div className={classes.courseDate}>
                          <img
                            className={classes.calendarIcon}
                            src={CalendarImg}
                            alt="Calendar icon"
                          />
                          <span className={classes.date}>
                            Mon, 17:30 - 19:00
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={classes.courseFooter}>
                      <div>
                        <span className={classes.coursePrice}>$6.00</span>{" "}
                        <span>/ class</span>
                      </div>
                      <div className={classes.seatRemain}>2 slots remain</div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className={classes.rightColumn}>
              <div>
                <img
                  className={classes.userAvatar}
                  src={placeholderAvatarImage}
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
