import { ComposeFormConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";
import ComposeForm from "./actions";
// import popupMessage from "../../../NotificationHandler";

//IMPLEMENT!
function* submitEmail(action) {
  try {
    const emailResponse = yield call(fetch, action.uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.compose),
    });

    const { status, msg } = yield call([emailResponse, "json"]);
    // popupMessage(status, msg);
    console.log("Email Write Saga ", action.compose);
    yield put(ComposeForm.submitComposeSuccess(action.Compose));
  } catch (e) {
    yield put(ComposeForm.submitComposeFail(e.message));
  }
}

function* loadEmails(action) {
  try {
    const loadEmailsResponse = yield call(fetch, action.uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { status, msg, data } = yield call([loadEmailsResponse, "json"]);

    switch (status) {
      case 1:
        yield put(Manage.loadEmailsSuccess(data));
        break;
      case -1:
        popupMessage(status, msg);
        yield put(Manage.loadEmployeesFail());
        break;
    }
  } catch (e) {}
}

function* removeEmployee(action) {
  try {
    const removeEmployeeResponse = yield call(fetch, action.uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.Compose),
    });

    const { status, msg } = yield call([removeEmployeeResponse, "json"]);

    popupMessage(status, msg);
    switch (status) {
      case 1:
        yield put(ComposeForm.removeEmployeeSuccess(msg, action.Compose));
      case -1:
        yield put(ComposeForm.removeEmployeeFail(msg));
    }
  } catch (e) {
    yield put(ComposeForm.removeEmployeeFail(e.message));
  }
}

function* ComposeFormSaga() {
  yield takeEvery(ComposeFormConstants.COMPOSE_FORM_SUBMIT, submitEmail);
  // yield takeEvery(ComposeFormConstants.LOAD_EMPLOYEES, loadEmployees);
  // yield takeEvery(ComposeFormConstants.REMOVE_EMPLOYEE, removeEmployee);
}

export default ComposeFormSaga;
