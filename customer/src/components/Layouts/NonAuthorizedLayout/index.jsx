import { memo } from "react";
import { withRouter } from "react-router-dom";

import Footer from "components/Footer";
import Navbar from "components/Navbar";

import classes from "./styles.module.scss";

const NonAuthorizedLayout = memo(props => {
  const { children } = props;

  return (
    <>
      <div className={classes.container}>
        <Navbar theme={props.location.pathname === "/" ? "white" : null} />
        {children}
      </div>
      <Footer />
    </>
  );
});

export default withRouter(NonAuthorizedLayout);
