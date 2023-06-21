import { Fragment, memo } from "react";
import { useSelector } from "react-redux";
import LoadingScreen from "../LoadingScreen";

export const AppStatus = memo(() => {
  const status = useSelector(state => state.status);

  return <Fragment>{status?.isLoading && <LoadingScreen />}</Fragment>;
});

export default AppStatus;
