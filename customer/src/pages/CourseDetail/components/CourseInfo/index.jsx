import dayjs from "dayjs";
import { memo } from "react";

import { formatCent } from "services/common_service";

import classes from "./styles.module.scss";

const CourseInfo = memo(
  ({ courseCost, courseSchedule, slotRemains, setOpenModal }) => {
    return (
      <div className={classes.sidePanelContainer}>
        <div className={classes.sidePanelContent}>
          <div className={classes.classPrice}>
            <span className={classes.price}>{formatCent(courseCost)}</span>
            <span className={classes.divider}>/</span>
            <span className={classes.unit}>class</span>
          </div>
          <div className={classes.upcomingClasses}>UPCOMING CLASSES</div>
          <div className={classes.metadataList}>
            {courseSchedule?.map(({ startTime, endTime }, index) => {
              return (
                <div key={index} className={classes.metadata}>
                  <div className={classes.classDate}>
                    <div className={classes.date}>
                      {dayjs(startTime).format("ddd, MMM D")}
                    </div>
                    <div className={classes.time}>
                      {dayjs(startTime).format("HH:mm")} -{" "}
                      {dayjs(endTime).format("HH:mm")}
                      {/* 10:00 - 10:55 (GMT+7); TIME ZONE WILL BE LEFT FOR LATER */}
                    </div>
                    <div className={classes.remain}>
                      Only {slotRemains < 0 ? 0 : slotRemains} slots remain
                    </div>
                  </div>
                  <div className={classes.cta}>
                    <div className={classes.price}>
                      {formatCent(courseCost)}
                    </div>
                    <button
                      className={classes.enrollBtn}
                      onClick={() => setOpenModal(true)}
                    >
                      Enroll
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
);

export default CourseInfo;
