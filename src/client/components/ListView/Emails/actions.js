import { EmailsActionsConstants } from "./constants";

function loadEmails() {
  return {
    type: EmailsActionsConstants.EMAILS_LOAD,
    uri: "/api/email/getall",
  };
}
function loadEmailsSuccess(emails) {
  return {
    type: EmailsActionsConstants.EMAILS_LOAD_SUCC,
    emails: emails,
  };
}
function loadEmailsFail(err_msg) {
  return {
    type: EmailsActionsConstants.EMAILS_LOAD_FAIL,
    err_msg: err_msg,
  };
}
function removeEmail(_id) {
  return {
    type: EmailsActionsConstants.REMOVE_EMAIL,
    uri: "/api/email/delete/" + _id,
  };
}
function removeEmailSuccess(emails) {
  return {
    type: EmailsActionsConstants.REMOVE_EMAIL_SUCC,
    emails: emails,
  };
}
function removeEmailFail(err_msg) {
  return {
    type: EmailsActionsConstants.REMOVE_EMAIL_FAIL,
    err_msg: err_msg,
  };
}

const EmailsActions = {
  loadEmails,
  loadEmailsSuccess,
  loadEmailsFail,
  removeEmail,
  removeEmailSuccess,
  removeEmailFail,
};

export default EmailsActions;
