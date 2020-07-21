import { ComposeFormConstants } from "./constants";
import initialState from "../../../initialState";

const ComposeFormReducer = (state = initialState.composeForm, action) => {
  switch (action.type) {
    case ComposeFormConstants.COMPOSE_FORM_SUBMIT_SUCC:
      state = state.set("submitFail", false);
      state = state.set("submitSucc", true);
      return state;
    case ComposeFormConstants.COMPOSE_FORM_SUBMIT_FAIL:
      state = state.set("submitSucc", false);
      state = state.set("submitFail", true);
      return state;
    default:
      return state;
  }
};

export default ComposeFormReducer;
