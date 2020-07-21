import { EmailsActionsConstants } from "./constants";
import initialState from "../../../initialState";

const EmailsReducer = (state = initialState.emails, action) => {
  switch (action.type) {
    case EmailsActionsConstants.EMAILS_LOAD_SUCC:
      state = state.set("emails", action.emails);
      return state;

    case EmailsActionsConstants.EMAILS_LOAD_FAIL:
      state = state.set("deleteSucc", false);
      state = state.set("deleteFail", true);
      return state;
    case EmailsActionsConstants.REMOVE_EMAIL_SUCC:
      state = state.set("emails", action.emails);
      state = state.set("deleteFail", false);
      state = state.set("deleteSucc", true);
      return state;

    case EmailsActionsConstants.REMOVE_EMAIL_FAIL:
      return state;

    default:
      return state;
  }
};

export default EmailsReducer;
