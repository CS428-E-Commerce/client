import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ApiService from "services/api_service";
import { formatCent, formatRate } from "services/common_service";
import { ToastService } from "services/toast_service";

import classes from "./styles.module.scss";

import Card from "../Card";
import Popover from "../Popover";

const formatClassHour = (startTime, endTime) => {
  if (!startTime || !endTime) return null;
  const formattedStartTime = dayjs(startTime).format("ddd, HH:mm");
  const formattedEndTime = dayjs(endTime).format("HH:mm");
  return `${formattedStartTime} - ${formattedEndTime}`;
};

// TODO: Consider splitting card & popover
const Course = memo(({ course }) => {
  const [show, setShow] = useState(false);
  const [coach, setCoach] = useState(null);
  const startDate = formatClassHour(course?.startTime, course?.endTime);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await ApiService.GET(`/api/coach/${course.coachId}`);
        setCoach(response?.data);
      } catch (error) {
        console.error(error);
        ToastService.error("Sorry, an error occurred.");
      }
    };

    init();
  }, []);

  return (
    <div className={classes.course}>
      <Link
        className={classes.link}
        to={`/courses/${course.courseId}?coachId=${course.coachId}`}
      >
        <Card
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          thumbnailSrc={course?.banner}
          courseTitle={course?.title}
          coursePrice={formatCent(course?.cost)}
          courseDescription={course?.description}
          courseStartDate={startDate}
          tutorAvatar={course.coachAvatar}
          tutorName={course.coachname}
          tutorRating={formatRate(course.coachRate)}
          tutorClassesTaught={course.coachTotalCourse}
          slotRemain={course.maxSlot}
        />
      </Link>
      <Popover
        show={show}
        tutorAvatar={course.coachAvatar}
        tutorName={course.coachname}
        tutorCertificates={coach?.certificates}
        tutorSkills={coach?.skills}
      />
    </div>
  );
});

export default Course;
