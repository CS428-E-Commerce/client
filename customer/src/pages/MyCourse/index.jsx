import React, { memo, useEffect, useState } from "react";

import ApiService from "services/api_service";

import classes from "./styles.module.scss";
import clsx from "clsx";
import {
  AvatarPlaceholderSrc,
  CheckIcon,
  GraduateHatIcon,
  SimpleCheckIcon,
  StarIcon,
  StarsImageSrc,
} from "assets/images";
import dayjs from "dayjs";
import { formatRate } from "services/common_service";

const MyCourse = memo(() => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [coach, setCoach] = useState(null);
  const [courseSchedules, setCourseSchedules] = useState([]);
  const [zoomLink, setZoomLink] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    const init = async () => {
      const response = await ApiService.GET("/api/user");
      setUser(response.data);
      const myCourses = await ApiService.GET("/api/courses", {
        userId: response?.data?.id ?? response?.data?.coachInfo?.id,
      });
      setCourses(myCourses.data);
    };

    init();
  }, []);

  useEffect(() => {
    const fetchAttendees = async () => {
      if (!selectedClass) return;

      const attendeesResponse = await ApiService.GET(`/api/attendees`, {
        courseId: selectedClass?.id,
        offset: 0,
      });

      setAttendees(attendeesResponse.data);

      const coachResponse = await ApiService.GET(
        `/api/coach/${selectedClass.coachId}`,
        {
          courseId: selectedClass?.id,
          offset: 0,
        },
      );
      setCoach(coachResponse?.data);

      const courseSchedulesResponse = await ApiService.GET(
        `/api/courses/schedule`,
        {
          courseId: selectedClass.id,
        },
      );
      setCourseSchedules(courseSchedulesResponse?.data);

      const courseDetailResponse = await ApiService.GET(
        `/api/courses/detail/${selectedClass.id}/${user.id}`,
      );
      setZoomLink(courseDetailResponse?.course?.zoomLink);
    };
    fetchAttendees();
  }, [selectedClass]);

  const handleClassClick = classItem => {
    setSelectedClass(classItem);
  };

  const classData = courses.map(course => ({
    id: course.courseId,
    title: course.title,
    detail: course.description,
    coachId: course.coachId,
    attendees: attendees.map(({ user_username, user_avatar }) => ({
      name: user_username,
      avatarUrl: user_avatar,
    })),
    tutor: {
      name: course.coachname,
      rating: Number(course.coachRate),
      since: "2022",
      verified: true,
      reviewCount: 10,
      lessonsTaught: 1245,
      avatarUrl: "https://placehold.co/100",
    },
    imageUrl: course.banner,
    upcomingSessions: ["Session 1", "Session 2", "Session 3"],
  }));

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>My Classes</h1>

      <div className={classes.classList}>
        {classData.map((classItem, index) => (
          <div
            className={clsx(classes.card, {
              [classes.selected]: selectedClass?.id === classItem.id,
            })}
            key={classItem.id}
            onClick={() => handleClassClick(classItem)}
          >
            <img
              className={classes.cardImg}
              src={classItem.imageUrl}
              alt={`Class ${classItem.title}`}
            />
            <div className={classes.cardContent}>
              <h2 className={classes.cardContentTitle}>{classItem.title}</h2>
              <div className={classes.nextClass}>
                <span>Next class: Thu, Jun 30</span>
                <span>&middot;</span>
                <span>10:00 - 10:55 (GMT+7)</span>
              </div>
            </div>
            {selectedClass?.id === classItem.id && (
              <SimpleCheckIcon className={classes.checkMark} />
            )}
          </div>
        ))}
      </div>

      {selectedClass !== null && (
        <div className={classes.detailsSection}>
          <div className={classes.detailColumn}>
            <div className={classes.attendeesSection}>
              <h4 className={classes.attendeesSectionHeading}>
                Students attending:
              </h4>

              <div className={classes.attendeesList}>
                {attendees.map(attendee => (
                  <div
                    className={classes.attendee}
                    key={attendee.course_attendee_id}
                  >
                    <img
                      src={attendee.user_avatar}
                      alt={`Avatar ${attendee.user_username}`}
                    />
                    <p className={classes.attendeeName}>
                      {attendee.user_username}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className={classes.tutorInfoSection}>
              <div className={classes.tutorInfoRow}>
                <img
                  className={classes.tutorInfoRowImg}
                  src={coach?.coachInfo?.avatar ?? AvatarPlaceholderSrc}
                  alt={`${coach?.coachInfo?.username} Avatar`}
                />
                <div className={classes.tutorInfo}>
                  <p className={classes.tutorName}>
                    Taught by {coach?.coachInfo?.username}
                  </p>
                  <p className={classes.since}>
                    On Vinglish since{" "}
                    {dayjs()
                      .subtract(coach?.yearExperience ?? 0, "year")
                      .year()}
                  </p>
                </div>
              </div>

              <button className={classes.contactButton}>
                Contact the Tutor
              </button>

              <div className={classes.verifiedRow}>
                <CheckIcon className={classes.checkIcon} />
                <p className={classes.verifiedText}>Verified Tutor</p>
              </div>
              <div className={classes.reviewRow}>
                <StarIcon className={classes.starIcon} />
                <p className={classes.text}>
                  <span>{formatRate(coach?.totalRate)} stars</span>{" "}
                  <span>({coach?.rateTurn} reviews)</span>
                </p>
              </div>
              <div className={classes.lessonsRow}>
                <GraduateHatIcon className={classes.hatIcon} />
                <p className={classes.text}>
                  {coach?.totalCourse} lessons taught
                </p>
              </div>
            </div>
          </div>
          <div className={classes.upcomingSessionsSection}>
            <h4 className={classes.upcomingSessionsSectionHeading}>
              Your Upcoming Class:
            </h4>
            {courseSchedules.map((session, index) => (
              <div key={session.id} className={classes.upcomingCard}>
                <div className={classes.upcomingCardContent}>
                  <div className={classes.imageContainer}>
                    <img
                      className={classes.upcomingCardImg}
                      src={selectedClass?.imageUrl}
                      alt={`Class ${selectedClass?.title}`}
                    />
                  </div>
                  <div>
                    <div className={classes.textContainer}>
                      <h2 className={classes.upcomingCardHeading}>
                        Session {index + 1}
                      </h2>
                      <p className={classes.classDetail}>
                        {selectedClass?.detail}
                      </p>
                    </div>
                    <a className={classes.joinButton} href={zoomLink}>
                      Join on Zoom
                    </a>
                  </div>
                </div>

                <div className={classes.calendarRow}>
                  <div className={classes.calendarButton}>
                    <img
                      src={
                        "https://cdn-icons-png.flaticon.com/512/55/55281.png"
                      }
                      alt="Calendar Icon"
                    />
                    <span>Add to your calendar</span>
                  </div>
                  <div className={classes.inviteButton}>
                    <img
                      src={
                        "https://cdn-icons-png.flaticon.com/512/4458/4458537.png"
                      }
                      alt="Invite Icon"
                    />
                    <span>Invite your friend</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default MyCourse;
