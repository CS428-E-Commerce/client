import { memo } from "react";

import { StarsIcon } from "assets/images";
import { formatNumber } from "services/common_service";

import classes from "./styles.module.scss";

const Overview = memo(
  ({
    coachAvatar,
    coachName,
    coachTotalRate,
    coachTotalCourse,
    courseBanner,
  }) => {
    return (
      <section className={classes.overview}>
        {courseBanner && (
          <div className={classes.banner}>
            <img className={classes.img} src={courseBanner} alt="" />
          </div>
        )}
      </section>
    );
  },
);

export default Overview;
