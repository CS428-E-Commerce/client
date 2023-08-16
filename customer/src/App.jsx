import { ConnectedRouter } from "connected-react-router";
import { Switch } from "react-router-dom";

import AppStatus from "components/AppStatus";
import AuthorizedLayout from "components/Layouts/AuthorizedLayout";
import DashboardLayout from "components/Layouts/DashboardLayout";
import NonAuthorizedLayout from "components/Layouts/NonAuthorizedLayout";
import ScrollToTop from "routes/ScrollToTop";

import { privateRoutes, publicRoutes, tutorRoutes } from "./routes";
import Middleware from "./routes/middleware";

const App = props => {
  const { history } = props;

  return (
    <ConnectedRouter history={history}>
      <AppStatus />
      <ScrollToTop />

      <Switch>
        {publicRoutes?.map((route, idx) => (
          <Middleware
            path={route?.path}
            layout={NonAuthorizedLayout}
            component={route?.component}
            key={route?.key || idx}
            isAuthProtected={false}
            exact
          />
        ))}

        {privateRoutes?.map((route, idx) => (
          <Middleware
            path={route?.path}
            layout={AuthorizedLayout}
            component={route?.component}
            key={route?.key || idx}
            isAuthProtected={true}
            exact
          />
        ))}

        {tutorRoutes?.map((route, idx) => (
          <Middleware
            path={route?.path}
            layout={DashboardLayout}
            component={route?.component}
            key={route?.key || idx}
            isAuthProtected={false}
            exact
          />
        ))}
      </Switch>
    </ConnectedRouter>
  );
};

export default App;
