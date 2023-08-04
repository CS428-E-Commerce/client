import { memo, useEffect, useState } from "react";

import { Pagination } from "@mui/material";
import Select from "components/Select";

import {
  DayIcon,
  LevelIcon,
  PriceIcon,
  SortIcon,
  TimeIcon,
  TopicIcon,
} from "assets/images/icons";

import classes from "./styles.module.scss";
import Course from "./components/Course";
import ApiService from "services/api_service";
import { ToastService } from "services/toast_service";
import { setLoading } from "redux/reducers/Status/actionTypes";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const AllCourses = memo(() => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const init = async () => {
      dispatch(setLoading(true));
      try {
        const response = await ApiService.GET("/api/courses", {
          windowIndex: 0,
          // ...
        });
        setCourses(response?.data ?? []);
      } catch (error) {
        console.error(error);
        ToastService.error("Sorry, an error occurred.");
      } finally {
        dispatch(setLoading(false));
      }
    };

    init();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <header>
          <h1 className={classes.title}>All Vietnamese Courses</h1>

          <div className={classes.filterContainer}>
            <Select
              icon={<LevelIcon />}
              minWidth={186}
              placeholder="Vietnamese Level"
            />
            <Select icon={<TopicIcon />} minWidth={85} placeholder="Topic" />
            <Select icon={<DayIcon />} minWidth={78} placeholder="Day" />
            <Select icon={<TimeIcon />} minWidth={88} placeholder="Time" />
            <Select icon={<PriceIcon />} minWidth={88} placeholder="Price" />
            <Select icon={<SortIcon />} minWidth={80} placeholder="Sort" />
          </div>
        </header>

        <section className={classes.allCourses}>
          {courses.map(course => (
            // TODO: Fix this link
            <Link
              to={`/courses/${course.courseId}?coachId=${course.coachId}`}
              key={course.courseId}
            >
              <Course
                thumbnailSrc={course.banner}
                courseTitle={course.title}
                coursePrice={course.cost}
                courseDescription={course.description}
                courseStartDate={`${dayjs(course.startTime).format(
                  "ddd, HH:mm - "
                )}${dayjs(course.endTime).format("HH:mm")}`}
                tutorAvatar={course.coachAvatar}
                tutorName={course.coachname}
                tutorRating={course.coachRate}
                tutorClassesTaught={course.coachTotalCourse}
                slotRemain={course.maxSlot /** - numberAttendees */}
                tutorCertificates={["Certified Vietnamese tutor"]}
                tutorLanguages={["English", "Vietnamese"]}
              />
            </Link>
          ))}
        </section>

        <Pagination
          count={1}
          page={page}
          onChange={(_, value) => {
            setPage(value);
          }}
          className={classes.pagination}
        />
      </div>
    </div>
  );
});

export default AllCourses;
