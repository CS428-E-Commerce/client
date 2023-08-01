import { memo, useState } from "react";

import Card from "../Card";

import classes from "./styles.module.scss";
import Popover from "../Popover";

const Course = memo(() => {
  const [show, setShow] = useState(false);

  return (
    <div className={classes.course}>
      <Card
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      />
      <Popover show={show} />
    </div>
  );
});

export default Course;
