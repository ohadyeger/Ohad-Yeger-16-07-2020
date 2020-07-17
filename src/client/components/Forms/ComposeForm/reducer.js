import { ComposeFormConstants } from "./constants";
import initialState from "../../../initialState";

const ComposeFormReducer = (state = initialState.composeForm, action) => {
  switch (action.type) {
    case ComposeFormConstants.COMPOSE_FORM_SUBMIT_SUCC:
      console.log("Email sent!");
      state = state.set("submitSucc", true);
      return state;
    case ComposeFormConstants.COMPOSE_FORM_SUBMIT_FAIL:
      console.log("Email sending failed!");
      state = state.set("submitFail", true);
      return state;
    default:
      return state;
  }
};

export default ComposeFormReducer;
