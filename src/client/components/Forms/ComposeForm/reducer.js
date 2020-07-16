import { ComposeFormConstants } from "./constants";
import initialState from "../../../initialState";

const ComposeFormReducer = (state = initialState.composeForm, action) => {
  switch (action.type) {
    case ComposeFormConstants.EMPLOYEE_FORM_SUBMIT_SUCC:
      console.log("Email sent!");
      return state;
    case ComposeFormConstants.EMPLOYEE_FORM_SUBMIT_FAIL:
      console.log("Email sending failed!");
      // alert("Compose Creation Failed");
      return state;
    // case ComposeFormConstants.LOAD_EMPLOYEES_SUCC:
    //   return state.set(
    //     "employees",
    //     [...Array.from(action.employees)].reverse()
    //   );
    // case ComposeFormConstants.LOAD_EMPLOYEES_FAIL:
    //   return state;
    // case ComposeFormConstants.REMOVE_EMPLOYEE_SUCC:
    //   const newEmployees = Array.from(state.get("employees")).filter((emp) => {
    //     return emp._id !== action.Compose._id;
    //   });
    //   return state.set("employees", newEmployees);
    // case ComposeFormConstants.REMOVE_EMPLOYEE_FAIL:
    //   return state;
    default:
      return state;
  }
};

export default ComposeFormReducer;
