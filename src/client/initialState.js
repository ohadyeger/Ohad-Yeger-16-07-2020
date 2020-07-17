const { Map } = require("immutable");

export default {
  app: Map({}),
  emails: Map({ emails: [], deleteSucc: false, deleteFail: false }),
  composeForm: Map({ submitSucc: false, submitFail: false }),
};
