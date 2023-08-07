import { memo, useState } from "react";

import classes from "./styles.module.scss";

import Card from "../Card";
import Popover from "../Popover";


// TODO: Consider splitting card & popover
const Course = memo(
  ({
    thumbnailSrc,
    courseTitle,
    coursePrice,
    courseDescription,
    courseStartDate,
    tutorAvatar,
    tutorName,
    tutorRating,
    tutorClassesTaught,
    slotRemain,
    tutorCertificates,
    tutorLanguages,
  }) => {
    const [show, setShow] = useState(false);

    return (
      <div className={classes.course}>
        <Card
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          thumbnailSrc={thumbnailSrc}
          courseTitle={courseTitle}
          coursePrice={coursePrice}
          courseDescription={courseDescription}
          courseStartDate={courseStartDate}
          tutorAvatar={tutorAvatar}
          tutorName={tutorName}
          tutorRating={tutorRating}
          tutorClassesTaught={tutorClassesTaught}
          slotRemain={slotRemain}
        />
        <Popover
          show={show}
          tutorName={tutorName}
          tutorAvatar={tutorAvatar}
          tutorCertificates={tutorCertificates}
          tutorLanguages={tutorLanguages}
        />
      </div>
    );
  }
);

export default Course;
