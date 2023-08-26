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
import useDebounce from "hooks/useDebounce";
import { setLoading } from "redux/reducers/Status/actionTypes";
import ApiService from "services/api_service";
import { ToastService } from "services/toast_service";

import Course from "./components/Course";
import classes from "./styles.module.scss";

const FindCourses = memo(() => {
  const dispatch = useDispatch();

  const [totalPage, setTotalPage] = useState(1);
  const [level, setLevel] = useState(undefined);
  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");

  const filterCourseTitle = useDebounce(e => {
    setCourseTitle(e.target.value);
  }, 500);

  useEffect(() => {
    const init = async () => {
      dispatch(setLoading(true));
      try {
        const response = await ApiService.GET("/api/courses", {
          code: null,
          coachId: null,
          userId: null,
          status: null,
          level,
          // TODO: integrate pagination
          offset: 5 * (page - 1),
          limit: 5,
          title: courseTitle,
        });
        setCourses(response?.data ?? []);
        setTotalPage(response?.lastPage ?? 1);
      } catch (error) {
        console.error(error);
        ToastService.error("Sorry, an error occurred.");
      } finally {
        dispatch(setLoading(false));
      }
    };

    init();
  }, [courseTitle, level, page]);

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <header>
          <div className={classes.heading}>
            <h1 className={classes.title}>All Vietnamese Courses</h1>
            <input
              className={classes.input}
              placeholder="Course Title"
              onChange={filterCourseTitle}
            />
          </div>

          <div className={classes.filterContainer}>
            <Select
              icon={<LevelIcon />}
              minWidth={186}
              placeholder="Vietnamese Level"
              onChange={data => setLevel(data.value)}
              options={[
                { value: "beginner", label: "Beginner" },
                { value: "intermediate", label: "Intermediate" },
                { value: "advance", label: "Advance" },
              ]}
            />
            {/* <Select icon={<TopicIcon />} minWidth={85} placeholder="Topic" /> */}
            {/* <Select icon={<DayIcon />} minWidth={78} placeholder="Day" /> */}
            {/* <Select icon={<TimeIcon />} minWidth={88} placeholder="Time" /> */}
            {/* <Select icon={<PriceIcon />} minWidth={88} placeholder="Price" /> */}
            {/* <Select icon={<SortIcon />} minWidth={120} placeholder="Sort By" /> */}
          </div>
        </header>

        <section className={classes.allCourses}>
          {courses.map(course => (
            <Course key={course.courseId} course={course} />
          ))}
        </section>

        <Pagination
          count={totalPage}
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

export default FindCourses;
