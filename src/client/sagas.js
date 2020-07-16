import { all } from "redux-saga/effects";
import AppSaga from "./components/App/saga";
import ComposeFormSaga from "./components/Forms/ComposeForm/saga";
import EmailsSaga from "./components/ListView/Emails/saga";

export default function* Sagas() {
  yield all([AppSaga(), ComposeFormSaga(), EmailsSaga()]);
}
