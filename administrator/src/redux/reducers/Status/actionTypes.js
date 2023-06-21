export const SET_LOADING_REDUCER = "SET_LOADING_REDUCER";

export const setLoading = isLoading => {
  return {
    type: SET_LOADING_REDUCER,
    isLoading,
  };
};
