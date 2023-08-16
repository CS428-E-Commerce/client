import { Container } from "@mui/material";
import { memo } from "react";
import { withRouter } from "react-router-dom";

import classes from "./styles.module.scss";

const NonAuthorizedLayout = memo(props => {
  const { children } = props;

  return (
    <div className={classes.pageContent}>
      <Container>{children}</Container>
    </div>
  );
});

export default withRouter(NonAuthorizedLayout);
