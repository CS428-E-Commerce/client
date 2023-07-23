import { memo, useLayoutEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { Container } from "@mui/material";
import classes from "./styles.module.scss";

const AuthorizedLayout = memo(props => {
  const { children } = props;
  const history = useHistory();

  useLayoutEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!auth) history.replace("/login", { prevLocation: history.location });
  }, []);

  return (
    <div className={classes.pageContent}>
      <Container>{children}</Container>
    </div>
  );
});

export default withRouter(AuthorizedLayout);
