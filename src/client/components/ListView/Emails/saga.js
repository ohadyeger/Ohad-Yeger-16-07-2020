import { EmailsActionsConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";
import EmailsActions from "./actions";

function* loadEmails(action) {
  try {
    const emailsResponse = yield call(fetch, action.uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const emailsJson = yield call([emailsResponse, "json"]); //retrieve body of response

    yield put(EmailsActions.loadEmailsSuccess(emailsJson));
  } catch (e) {
    yield put(EmailsActions.loadEmailsFail(e.message));
  }
}
function* removeEmail(action) {
  try {
    const emailsResponse = yield call(fetch, action.uri, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const emailsJson = yield call([emailsResponse, "json"]); //retrieve body of response

    yield put(EmailsActions.removeEmailSuccess(emailsJson));
  } catch (e) {
    yield put(EmailsActions.removeEmailFail(e.message));
  }
}

function* EmailsSaga() {
  yield takeEvery(EmailsActionsConstants.EMAILS_LOAD, loadEmails);
  yield takeEvery(EmailsActionsConstants.REMOVE_EMAIL, removeEmail);
}

export default EmailsSaga;
