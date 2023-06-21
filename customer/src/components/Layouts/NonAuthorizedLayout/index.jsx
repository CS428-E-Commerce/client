import { memo } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "@mui/material";
import classes from "./styles.module.scss";

const NonAuthorizedLayout = memo(props => {
  const { children } = props;

  return (
    <div className={classes.container}>
      <Container>{children}</Container>
    </div>
  );
});

export default withRouter(NonAuthorizedLayout);
