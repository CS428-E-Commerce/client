import { Fragment, useEffect, useState } from "react";
import { Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { privateRoutes, publicRoutes } from "./routes";
import Middleware from "./routes/middleware";
import AuthorizedLayout from "components/Layouts/AuthorizedLayout";
import NonAuthorizedLayout from "components/Layouts/NonAuthorizedLayout";
import AppStatus from "components/AppStatus";

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ApiService from "services/api_service";
import LoadingScreen from "components/LoadingScreen";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);

const App = props => {
  const { history } = props;
  // TODO: Consider another flow for Stripe
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const init = async () => {
      const response = await ApiService.GET("/api/payment/1");
      setClientSecret(response.data?.client_secret);
    };

    init();
  }, []);

  const options = {
    clientSecret,
  };

  return clientSecret ? (
    <Elements stripe={stripePromise} options={options}>
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
    </Elements>
  ) : (
    <LoadingScreen />
  );
};

export default App;
