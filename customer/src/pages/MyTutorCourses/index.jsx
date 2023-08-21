import React, { memo, useEffect, useState } from "react";

import ApiService from "services/api_service";

import classes from "./styles.module.scss";

const MyTutorCourses = memo(() => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const init = async () => {
      const response = await ApiService.GET("/api/user");
      const myCourses = await ApiService.GET("/api/courses", {
        coachId: response?.data?.coachInfo?.id,
      });
      setCourses(myCourses.data);
    };

    init();
  }, []);

  const classData = courses.map(course => ({
    id: course.courseId,
    title: course.title,
    detail: course.description,
    attendees: [
      { name: "Alice", avatarUrl: "https://placehold.co/50" },
      { name: "Bob", avatarUrl: "https://placehold.co/50" },
      { name: "Charlie", avatarUrl: "https://placehold.co/50" },
    ],
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

  const [selectedClass, setSelectedClass] = useState(null);

  const handleClassClick = classId => {
    setSelectedClass(classId);
  };

  const selectedClassData = classData.find(c => c.id === selectedClass);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>My Classes</h1>

      <div className={classes.classList}>
        {classData.map((classItem, index) => (
          <React.Fragment key={classItem.id}>
            <div
              className={`${classes.card} ${
                selectedClass === classItem.id ? classes.selected : ""
              }`}
              onClick={() => handleClassClick(classItem.id)}
            >
              <img src={classItem.imageUrl} alt={`Class ${classItem.id}`} />
              <div className={classes["card-content"]}>
                <h2>{classItem.title}</h2>
              </div>
              {selectedClass === classItem.id && (
                <span className={classes["check-mark"]}>✓</span>
              )}
            </div>
            {index !== classData.length - 1 && (
              <div className={classes.divider} />
            )}
          </React.Fragment>
        ))}
      </div>

      {selectedClass !== null && (
        <div className={classes.detailsSection}>
          <div className={classes.detailColumn}>
            <div className={classes.attendeesSection}>
              <h4 className="class-title">Students attending:</h4>

              <div className={classes.attendeesList}>
                {selectedClassData?.attendees.map((attendee, index) => (
                  <div className={classes.attendee} key={index}>
                    <img
                      src={attendee.avatarUrl}
                      alt={`Avatar ${attendee.name}`}
                    />
                    <p>{attendee.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={classes.tutorInfoSection}>
              <div className={classes.tutorInfoRow}>
                <img
                  src={selectedClassData?.tutor.avatarUrl}
                  alt={`Avatar ${selectedClassData?.tutor.name}`}
                />
                <div>
                  <p>Taught by {selectedClassData?.tutor.name}</p>
                </div>
                <div className={classes.subTitle}>
                  <p>On Vinglish since {selectedClassData?.tutor.since}</p>
                </div>
              </div>

              <button className={classes.contactButton}>
                Contact the Tutor
              </button>
              {selectedClassData?.tutor.verified && (
                <div className={classes.verifiedRow}>
                  <img
                    src={
                      "https://static.vecteezy.com/system/resources/previews/013/743/787/original/check-mark-shield-icon-png.png"
                    }
                    alt="Verified Icon"
                  />
                  <p>Verified Tutor</p>
                </div>
              )}
              <div className={classes.reviewRow}>
                <img
                  src={"https://cdn-icons-png.flaticon.com/512/541/541415.png"}
                  alt="Star Icon"
                />
                <p>{selectedClassData?.tutor.rating} stars</p>
                <p>({selectedClassData?.tutor.reviewCount} reviews)</p>
              </div>
              <div className={classes.lessonsRow}>
                <img
                  src={
                    "https://cdn-icons-png.flaticon.com/512/4344/4344806.png"
                  }
                  alt="Graduating Cap Icon"
                />
                <p>{selectedClassData?.tutor.lessonsTaught} lessons taught</p>
              </div>
            </div>
          </div>
          <div className={classes.upcomingSessionsSection}>
            <>Your Upcoming Class:</>
            {selectedClassData?.upcomingSessions.map((session, index) => (
              <div key={index} className={classes.upcomingCard}>
                <div className={classes.upcomingCardContent}>
                  <div className={classes.imageContainer}>
                    <img
                      src={selectedClassData?.imageUrl}
                      alt={`Class ${selectedClassData?.title}`}
                    />
                  </div>
                  <div className={classes.textContainer}>
                    <h2>{session}</h2>
                    <p className={classes["class-detail"]}>
                      {selectedClassData?.detail}
                    </p>
                  </div>
                </div>
                <button className={classes.joinButton}>Join on Zoom</button>
                <div className={classes["calendar-row"]}>
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

export default MyTutorCourses;
