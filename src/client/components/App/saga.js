// import { takeEvery, put, call } from "redux-saga/effects";
// import { AppActionsConstants } from "./constants";
// // import {AuthenticationFormActions} from "../Forms/AuthenticationForm/actions";
// import { browserHistory } from "react-router";

// function* logout(action) {
//   try {
//     const logoutResponse = yield call(fetch, action.uri, {
//       methods: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const logoutResponseJson = yield call([logoutResponse, "json"]);
//   } catch (e) {}
// }

// function* authenticate(action){
//     try{
//         const authResponse = yield call(fetch, action.uri, {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(action.data)
//         })

//         const {status, permissions, msg} = yield call([authResponse, 'json'])
//         yield put(AuthenticationFormActions.loginSuccess(status, permissions))
//     } catch(e){
//         // yield put(AuthenticationFormActions.loginSuccess(true))
//     }
// }
function* AppSaga() {
  // yield takeEvery(AppActionsConstants.LOGOUT, logout);
  // yield takeEvery(AppActionsConstants.AUTH, authenticate);
}

export default AppSaga;
