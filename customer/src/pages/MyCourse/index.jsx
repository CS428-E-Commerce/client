import React, { memo, useState } from "react";
import classes from "./styles.module.scss";

const MyCourse = memo(() => {
  const classData = [
    {
      id: 1,
      title: "Class 1",
      detail: "Details of Class 1",
      attendees: [
        { name: "Alice", avatarUrl: "https://placehold.co/50" },
        { name: "Bob", avatarUrl: "https://placehold.co/50" },
        { name: "Charlie", avatarUrl: "https://placehold.co/50" },
        // Add more attendees as needed
      ],
      tutor: {
        name: "John Doe",
        rating: 5,
        since: "2022",
        verified: true,
        reviewCount: 10,
        lessonsTaught: 1000,
        avatarUrl: "https://placehold.co/100",
      },
      imageUrl: "https://placehold.co/100",
      upcomingSessions: ["Session 1", "Session 2", "Session 3"],
    },
    {
      id: 2,
      title: "Class 2",
      detail: "Details of Class 2",
      attendees: [
        { name: "David", avatarUrl: "https://placehold.co/50" },
        { name: "Eva", avatarUrl: "https://placehold.co/50" },
        { name: "Frank", avatarUrl: "https://placehold.co/50" },
        // Add more attendees as needed
      ],
      tutor: {
        name: "Jane Smith",
        rating: 4.5,
        since: "2021",
        verified: true,
        reviewCount: 15,
        lessonsTaught: 2500,
        avatarUrl: "https://placehold.co/100",
      },
      imageUrl: "https://placehold.co/100",
      upcomingSessions: ["Session B", "Session C"],
    },
    // Add more class data as needed
  ];

  const [selectedClass, setSelectedClass] = useState(null);

  const handleClassClick = classId => {
    setSelectedClass(classId);
  };

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
                {classData[selectedClass - 1].attendees.map(
                  (attendee, index) => (
                    <div className={classes.attendee} key={index}>
                      <img
                        src={attendee.avatarUrl}
                        alt={`Avatar ${attendee.name}`}
                      />
                      <p>{attendee.name}</p>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className={classes.tutorInfoSection}>
              <div className={classes.tutorInfoRow}>
                <img
                  src={classData[selectedClass - 1].tutor.avatarUrl}
                  alt={`Avatar ${classData[selectedClass - 1].tutor.name}`}
                />
                <div>
                  <p>Taught by {classData[selectedClass - 1].tutor.name}</p>
                </div>
                <div className={classes.subTitle}>
                  <p>
                    On Vinglish since {classData[selectedClass - 1].tutor.since}
                  </p>
                </div>
              </div>

              <button className={classes.contactButton}>
                Contact the Tutor
              </button>
              {classData[selectedClass - 1].tutor.verified && (
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
                <p>{classData[selectedClass - 1].tutor.rating} stars</p>
                <p>
                  ({classData[selectedClass - 1].tutor.reviewCount} reviews)
                </p>
              </div>
              <div className={classes.lessonsRow}>
                <img
                  src={
                    "https://cdn-icons-png.flaticon.com/512/4344/4344806.png"
                  }
                  alt="Graduating Cap Icon"
                />
                <p>
                  {classData[selectedClass - 1].tutor.lessonsTaught} lessons
                  taught
                </p>
              </div>
            </div>
          </div>
          <div className={classes.upcomingSessionsSection}>
            <>Your Upcoming Class:</>
            {classData[selectedClass - 1].upcomingSessions.map(
              (session, index) => (
                <div key={index} className={classes.upcomingCard}>
                  <div className={classes.upcomingCardContent}>
                    <div className={classes.imageContainer}>
                      <img
                        src={classData[selectedClass - 1].imageUrl}
                        alt={`Class ${classData[selectedClass - 1].title}`}
                      />
                    </div>
                    <div className={classes.textContainer}>
                      <h2>{session}</h2>
                      <p className={classes["class-detail"]}>
                        {classData[selectedClass - 1].detail}
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
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default MyCourse;
