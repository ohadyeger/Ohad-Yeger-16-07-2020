import { combineReducers } from "redux";
import AppReducer from "./components/App/reducer";
import ComposeFormReducer from "./components/Forms/ComposeForm/reducer";
import EmailsReducer from "./components/ListView/Emails/reducer";

export default combineReducers({
  app: AppReducer,
  emails: EmailsReducer,
  composeForm: ComposeFormReducer,
});
