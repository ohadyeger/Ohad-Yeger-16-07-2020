import { ComposeFormConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";
import ComposeForm from "./actions";

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
    console.log("Email Write Saga ", action.compose);
    yield put(ComposeForm.submitComposeSuccess(action.Compose));
  } catch (e) {
    yield put(ComposeForm.submitComposeFail(e.message));
  }
}

function* ComposeFormSaga() {
  yield takeEvery(ComposeFormConstants.COMPOSE_FORM_SUBMIT, submitEmail);
}

export default ComposeFormSaga;
