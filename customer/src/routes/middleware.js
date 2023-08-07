import PropTypes from "prop-types";
import { memo } from "react";
import { Redirect, Route } from "react-router-dom";

const Middleware = memo(
  ({ component: Component, layout: Layout, isAuthProtected, ...rest }) => (
    <Route
      {...rest}
      render={props => {
        if (isAuthProtected && !localStorage.getItem("authUser")) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  )
);

Middleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
};

export default Middleware;
