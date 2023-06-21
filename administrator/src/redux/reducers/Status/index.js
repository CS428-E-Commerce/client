import produce from "immer";
import * as types from "./actionTypes";

const initial = {
  isLoading: false,
};

export const statusReducer = (state = initial, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.SET_LOADING_REDUCER:
        draft.isLoading = action.isLoading;
        break;
      default:
        return state;
    }
  });
