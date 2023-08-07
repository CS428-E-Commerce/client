import { Pagination } from "@mui/material";
import { push } from "connected-react-router";
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  DayIcon,
  LevelIcon,
  PriceIcon,
  SortIcon,
  StarIcon,
  TimeIcon,
  TopicIcon,
} from "assets/images";
import placeholderAvatarImage from "assets/images/placeholder-avatar.jpeg";
import Loading from "components/Loading";
import Select from "components/Select";
import ApiService from "services/api_service";
import { formatCent, formatNumber } from "services/common_service";
import { ToastService } from "services/toast_service";

import classes from "./styles.module.scss";

const FindTutorsPage = memo(() => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    ApiService.GET(`/api/coach`, {
      offset: page - 1,
      limit: 12,
      name: "",
    })
      .then(response => {
        setData(response?.data);
        setTotal(response?.meta?.total);
      })
      .catch(error => {
        console.log(error);
        ToastService.error("Sorry, an error occurred.");
      });
  }, []);

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
          {data ? (
            data?.map((item, index) => {
              return (
                <div
                  className={classes.tutorContainer}
                  key={`tutor-${index}`}
                  onClick={() => {
                    dispatch(push(`/tutor/${item?.id}`));
                  }}
                >
                  <p className={classes.price}>
                    <b>
                      {item?.averageCost !== null
                        ? `~${formatCent(item?.averageCost)}`
                        : "~$..."}
                    </b>{" "}
                    / class
                  </p>

                  <img
                    className={classes.avatar}
                    src={item?.coachInfo?.avatar ?? placeholderAvatarImage}
                    alt="Avatar"
                  />

                  <p className={classes.name}>
                    {item?.coachInfo?.username ?? "N/A"}
                  </p>

                  <div className={classes.info}>
                    <StarIcon />
                    <span>{item?.totalRate ?? "N/A"}</span>
                    {item?.totalCourse ? (
                      <span>({formatNumber(item?.totalCourse)} classes)</span>
                    ) : null}
                  </div>

                  <p className={classes.role}>Certified Vietnamese tutor</p>

                  <div className={classes.skills}>
                    {item?.certificates?.map((cert, certIndex) => {
                      if (certIndex > 3) {
                        return null;
                      } else if (certIndex === 3) {
                        return (
                          <div key={`cert-${certIndex}`}>
                            +{cert?.certificates?.length - 3}
                          </div>
                        );
                      } else {
                        return (
                          <div key={`cert-${certIndex}`}>
                            {cert?.certificate ?? "N/A"}
                          </div>
                        );
                      }
                    })}
                  </div>

                  <p className={classes.description}>
                    {item?.coachInfo?.description ?? "N/A"}
                  </p>

                  <hr className={classes.horizontalLine} />

                  <div className={classes.viewProfileButton}>VIEW PROFILE</div>
                </div>
              );
            })
          ) : (
            <Loading />
          )}
        </div>

        <Pagination
          count={Math.ceil((total ?? 0) / 12)}
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
