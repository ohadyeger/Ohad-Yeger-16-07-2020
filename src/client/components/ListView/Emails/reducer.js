import { EmailsActionsConstants } from "./constants";
import initialState from "../../../initialState";

const EmailsReducer = (state = initialState.emails, action) => {
  switch (action.type) {
    case EmailsActionsConstants.EMAILS_LOAD_SUCC:
      console.log("Reducer: emails", action.emails);
      state = state.set("emails", action.emails);
      return state;

    case EmailsActionsConstants.EMAILS_LOAD_FAIL:
      console.log("email load failed");
      state = state.set("deleteFail", true);
      return state;
    case EmailsActionsConstants.REMOVE_EMAIL_SUCC:
      console.log(action);
      state = state.set("emails", action.emails);
      state = state.set("deleteSucc", true);

      console.log("Reducer: email removed");
      // state = state.set("emails", action.emails);
      return state;

    case EmailsActionsConstants.REMOVE_EMAIL_FAIL:
      console.log("email remove failed");
      return state;

    default:
      return state;
  }
};

export default EmailsReducer;
