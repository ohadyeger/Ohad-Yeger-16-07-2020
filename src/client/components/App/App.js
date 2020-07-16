import React from "react";
// import "./App.scss";
import "bootstrap/dist/css/bootstrap.css";
import { connect } from "react-redux";
import AppActions from "./actions";
import { withCookies } from "react-cookie";
import Emails from "../ListView/Emails/Emails";
import ComposeForm from "../Forms/ComposeForm/ComposeForm";
// import ComposeForm from "../Forms/ComposeForm/ComposeForm";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  Icon,
  Menu,
  Segment,
  Modal,
} from "semantic-ui-react";

const BackgroundUrl =
  "https://herolo.co.il/portfolio-background-new2.2fef25b1c7370a4cff57.jpg"; // "http://www.soos.org.il/wp-content/uploads/2019/08/soos-mini-site-baner.jpg";

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.logoutHandle = this.logoutHandle.bind(this)
  }

  componentDidMount() {
    // this.props.loadUserEventHandler(this.props.cookies.cookies.name);
    // this.props.authenticate({page_permissions: 1})
  }

  logoutHandle(event) {
    this.props.logout();
  }

  render() {
    return (
      <Router
        style={{
          height: "100%",
        }}
      >
        {/* {this.props.login_status === 1? */}
        <div
          style={{
            height: "100%",
            backgroundImage: `url(${BackgroundUrl})`,
            backgroundSize: "cover",
            backgroundRepeat: "yes",
            resizeMode: "stretch",
          }}
        >
          <div style={{ height: "7%" }}>
            <Menu fixed="top" inverted style={{ height: "7%" }}>
              <Menu.Item header as="a" href="/">
                Herolo Full Stack Assignment
              </Menu.Item>
              <Menu.Item header as="a" href="/compose">
                Compose Email Page
              </Menu.Item>
              <Menu.Item header as="a" href="/manage">
                {/* <Image
                  size="mini"
                  src="favicon.ico"
                  style={{ marginRight: "1.5em" }}
                /> */}
                Manage Emails Page
              </Menu.Item>
            </Menu>
          </div>
          <section style={{ height: "93%", width: "100%" }}>
            <Switch style={{ height: "100%", width: "100%" }}>
              <Route exact path="/">
                Welcome
              </Route>
              <Route exact path="/compose">
                <ComposeForm />
              </Route>
              <Route exact path="/manage">
                <Emails />
              </Route>
              {/* <PrivateRoute
                // style={{ height: "100%", width: "100%" }}
                path="/manage"
                // page_permissions={Permissions.Editor}
                component={HatcheryForm}
              /> */}
              {/* <PrivateRoute
                path="/profiles"
                page_permissions={Permissions.Viewer}
                cookies={this.props.cookies}
                component={Profiles}
              /> */}
            </Switch>
          </section>

          {/* {this.props.permissions >= Permissions.Editor ? ( */}
          {/* <Dropdown item simple text="Create" icon="triangle down">
                <Dropdown.Menu>
                  <Dropdown.Item as="a" href="/hatcheryform">
                    <Icon name="warehouse" />
                    Hatchery
                  </Dropdown.Item>
                  <Dropdown.Item as="a" href="/expform">
                    <Icon name="hourglass half" />
                    Experiment
                  </Dropdown.Item>
                  <Dropdown.Item as="a" href="/swform">
                    <Icon name="code" />
                    Software
                  </Dropdown.Item>
                  <Dropdown.Item as="a" href="/boardform">
                    <Icon name="microchip" />
                    Board
                  </Dropdown.Item>
                  <Dropdown.Item as="a" href="/profileform">
                    <Icon name="file excel" />
                    Profile
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
          {/* ) : (
                <div></div>
              )} */}

          {/* {this.props.permissions >= Permissions.CO_ADMIN ? ( */}
          {/* <Dropdown item simple text="Admin" icon="triangle down">
                <Dropdown.Menu>
                  <Dropdown.Item as="a" href="/register">
                    <Icon name="male" />
                    Users Management
                  </Dropdown.Item>
                  <Dropdown.Item as="a" href="/employeeform">
                    <Icon name="male" />
                    Employees Management
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
          {/* ) : (
                <div></div>
              )} */}

          {/* <Menu.Menu position="right">
                <Menu.Item as="a" href="/" onClick={this.logoutHandle}>
                  <Icon name="sign-out" />
                  Logout
                </Menu.Item>
              </Menu.Menu> */}
          {/* <Menu.Menu position='right'>*/}
          {/*   <Menu.Item  as="a" href="/login">*/}
          {/*     <Icon name="sign-in" />*/}
          {/*     Log In*/}
          {/*   </Menu.Item>*/}
          {/*</Menu.Menu> */}
        </div>
        {/* //   :
        //     this.props.login_status === -1?
        //     <LoginForm/> :
        //     <div></div>
        // } */}
      </Router>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    username: props.cookies.cookies.name,
    // login_status: state["authenticationForm"].get("login_status"),
    // permissions: state["authenticationForm"].get("permissions"),
    location:
      props.cookies.cookies.location &&
      props.cookies.cookies.location !== "undefined" &&
      JSON.parse(props.cookies.cookies.location),
    loggedInUserId:
      props.cookies && props.cookies.cookies.id
        ? JSON.parse(props.cookies.cookies.id)
        : null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUserEventHandler: (name) => {
      dispatch(AppActions.loadUserEventHandler(name));
    },
    authenticate: (page_permissions) =>
      dispatch(AppActions.authenticate(page_permissions)),
    logout: () => dispatch(AppActions.logout()),
  };
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(App));
