import { memo, useState } from "react";

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

const AllCourses = memo(() => {
  const [page, setPage] = useState(1);

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
          <Course />
          <Course />
          <Course />
          <Course />
          <Course />
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
