import { memo, useState } from "react";
import classes from "./styles.module.scss";
import Select from "components/Select";
import {
  DayIcon,
  LevelIcon,
  PriceIcon,
  SortIcon,
  StarIcon,
  TimeIcon,
  TopicIcon,
} from "assets/images/icons";
import mockupAvatarImg from "assets/images/mockup-avatars/albert-dera.jpg";
import { Pagination } from "@mui/material";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const FindTutorsPage = memo(() => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <p className={classes.title}>All Vietnamese tutors</p>

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

        <div className={classes.tutorList}>
          {[...Array(12)]?.map((_, index) => {
            return (
              <div
                className={classes.tutorContainer}
                key={index}
                onClick={() => {
                  dispatch(push(`/tutor-profile`));
                }}
              >
                <p className={classes.price}>
                  <b>~$6</b> / class
                </p>

                <img
                  className={classes.avatar}
                  src={mockupAvatarImg}
                  alt="Albert Dera's avatar"
                />

                <p className={classes.name}>Niusha S.</p>

                <div className={classes.info}>
                  <StarIcon />
                  <span>5.0</span>
                  <span>(1,234 classes)</span>
                </div>

                <p className={classes.role}>Certified Vietnamese tutor</p>

                <div className={classes.skills}>
                  <div>Grammar</div>
                  <div>Vocab</div>
                  <div>Conversation</div>
                  <div>+4</div>
                </div>

                <p className={classes.description}>
                  Niusha is a certified Vietnamese tutor who has been on
                  Vinglish for 5 years
                </p>

                <hr className={classes.horizontalLine} />

                <div className={classes.viewProfileButton}>VIEW PROFILE</div>
              </div>
            );
          })}
        </div>

        <Pagination
          count={12}
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

export default FindTutorsPage;
