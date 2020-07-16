import { ComposeFormConstants } from "./constants";

function submitCompose(messageObj) {
  return {
    type: ComposeFormConstants.COMPOSE_FORM_SUBMIT,
    uri: "/api/email/write",
    compose: messageObj,
  };
}
function submitComposeSuccess(compose) {
  return {
    type: ComposeFormConstants.COMPOSE_FORM_SUBMIT_SUCC,
    compose: compose,
  };
}
function submitComposeFail(err_msg) {
  return {
    type: ComposeFormConstants.COMPOSE_FORM_SUBMIT_FAIL,
    err_msg: err_msg,
  };
}

const ComposeFormActions = {
  submitCompose,
  submitComposeSuccess,
  submitComposeFail,
};

export default ComposeFormActions;
