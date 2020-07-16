import React from "react";
import ReactDOM from "react-dom";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { CookiesProvider } from "react-cookie";
// import ExperimentForm from "./components/Forms/ExperimentForm/ExperimentForm";
import App from "./components/App/index";
import reducers from "./reducers";
import Sagas from "./sagas";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "bootstrap/dist/css/bootstrap.min.css";

//create saga middleware
const sagaMiddleware = createSagaMiddleware();
//create store, add reducers, attach saga
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

//run saga(s)
sagaMiddleware.run(Sagas);

// Render the main component into the dom

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </CookiesProvider>,
  document.getElementById("app")
);
