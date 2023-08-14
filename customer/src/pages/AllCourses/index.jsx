import { Pagination } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  DayIcon,
  LevelIcon,
  PriceIcon,
  SortIcon,
  TimeIcon,
  TopicIcon,
} from "assets/images";
import Select from "components/Select";
import { setLoading } from "redux/reducers/Status/actionTypes";
import ApiService from "services/api_service";
import { ToastService } from "services/toast_service";

import Course from "./components/Course";
import classes from "./styles.module.scss";

const AllCourses = memo(() => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const init = async () => {
      dispatch(setLoading(true));
      try {
        const response = await ApiService.GET("/api/courses", {
          code: null,
          coachId: null,
          userId: null,
          status: null,
          level: null,
          // TODO: integrate pagination
          offset: 0,
          limit: 5,
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
            <Course key={course.courseId} course={course} />
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
