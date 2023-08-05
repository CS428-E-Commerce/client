import { Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { privateRoutes, publicRoutes } from "./routes";
import Middleware from "./routes/middleware";
import AuthorizedLayout from "components/Layouts/AuthorizedLayout";
import NonAuthorizedLayout from "components/Layouts/NonAuthorizedLayout";
import AppStatus from "components/AppStatus";

const App = props => {
  const { history } = props;

  return (
    <ConnectedRouter history={history}>
      <AppStatus />

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
      </Switch>
    </ConnectedRouter>
  );
};

export default App;
