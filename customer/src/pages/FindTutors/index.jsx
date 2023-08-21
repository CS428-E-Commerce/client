import { Pagination } from "@mui/material";
import { push } from "connected-react-router";
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  AvatarPlaceholderSrc,
  DayIcon,
  LevelIcon,
  PriceIcon,
  SortIcon,
  StarIcon,
  TimeIcon,
  TopicIcon,
} from "assets/images";
import Loading from "components/Loading";
import Select from "components/Select";
import useDebounce from "hooks/useDebounce";
import ApiService from "services/api_service";
import { formatCent, formatNumber } from "services/common_service";
import { ToastService } from "services/toast_service";

import classes from "./styles.module.scss";

const sliceCerts = certs => {
  const result = certs.slice(0, 3);

  if (certs.length > 3) {
    result.push({
      id: Date.now() * Math.random(),
      certificate: `+${certs.slice(3).length}`,
    });
  }

  return result;
};

const FindTutorsPage = memo(() => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);
  const [name, setName] = useState(undefined);
  const [sortBy, setSortBy] = useState(undefined);
  const [direction, setDirection] = useState("ASC");

  const filterTutorName = useDebounce(e => {
    setName(e.target.value);
  }, 500);

  const handleSortBy = option => {
    setSortBy(option.value);
  };

  useEffect(() => {
    ApiService.GET(`/api/coach`, {
      offset: page - 1,
      limit: 12,
      name,
      sortBy,
      direction,
    })
      .then(response => {
        setData(response?.data);
        setTotal(response?.meta?.total);
      })
      .catch(error => {
        console.log(error);
        ToastService.error("Sorry, an error occurred.");
      });
  }, [name, sortBy]);

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <div className={classes.heading}>
          <p className={classes.title}>All Vietnamese tutors</p>
          <input
            className={classes.input}
            placeholder="Tutor name"
            onChange={filterTutorName}
          />
        </div>

        <div className={classes.filterContainer}>
          <Select
            icon={<SortIcon />}
            minWidth={120}
            placeholder="Sort By"
            onChange={handleSortBy}
            options={[
              { value: "totalRate", label: "Total Rate" },
              // { value: "rateTurn", label: "Rate Turn" },
              // { value: "totalStudent", label: "Total Student" },
              // { value: "totalCourse", label: "Total Course" },
              // { value: "totalComment", label: "Total Comment" },
              // { value: "yearExperience", label: "Year Experience" },
              // { value: "averageCost", label: "Average Cost" },
            ]}
          />
        </div>

        <div className={classes.tutorList}>
          {data ? (
            data?.map((item, index) => {
              return (
                <div
                  className={classes.tutorContainer}
                  key={`tutor-${index}`}
                  onClick={() => {
                    dispatch(push(`/profile/${item?.id}`));
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
                    src={item?.coachInfo?.avatar ?? AvatarPlaceholderSrc}
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
                    {item?.certificates &&
                      sliceCerts(item?.certificates).map(cert => (
                        <div key={`cert-${cert.id}`} className={classes.skill}>
                          {cert?.certificate ?? "N/A"}
                        </div>
                      ))}
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
