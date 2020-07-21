import React from "react";
import { connect } from "react-redux";
import AppActions from "./actions";
import Emails from "../ListView/Emails/Emails";
import ComposeForm from "../Forms/ComposeForm/ComposeForm";
import { BrowserRouter as Router } from "react-router-dom";
import {
  Icon,
  Menu,
  Container,
  Header,
  Button,
  Segment,
} from "semantic-ui-react";
import Background from "./background.jpg";

const HomepageHeading = (app) => (
  <Segment padded="very" raised inverted>
    <Container>
      <Header
        as="h1"
        content="Email Page Management"
        inverted
        style={{
          fontSize: "4em",
          fontWeight: "normal",
          marginBottom: 0,
        }}
      />
      <Header
        as="h2"
        content="Compose and view Emails in the easiest way."
        inverted
        style={{
          fontSize: "1.7em",
          fontWeight: "normal",
          marginTop: "1.5em",
        }}
      />
      <Button
        secondary
        size="huge"
        onClick={() => app.setState({ page: "compose" })}
      >
        Get Started
        <Icon name="right arrow" />
      </Button>
    </Container>
  </Segment>
);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "home",
    };
  }

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div
          style={{
            height: "100vh",
            backgroundImage: `url(${Background}) `,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            resizeMode: "stretch",
          }}
        >
          <Menu inverted>
            <Menu.Item
              active={this.state.page === "home"}
              onClick={() => this.setState({ page: "home" })}
            >
              <Icon name="home" />
              Herolo Full Stack Assignment
            </Menu.Item>
            <Menu.Item
              active={this.state.page === "compose"}
              onClick={() => this.setState({ page: "compose" })}
            >
              <Icon name="compose" />
              Compose Email Page
            </Menu.Item>
            <Menu.Item
              active={this.state.page === "manage"}
              onClick={() => this.setState({ page: "manage" })}
            >
              <Icon name="mail" />
              Manage Emails Page
            </Menu.Item>
          </Menu>
          <Container>
            <div>
              {this.state.page === "home" ? (
                <div>{HomepageHeading(this)}</div>
              ) : (
                []
              )}
              {this.state.page === "compose" ? <ComposeForm /> : []}
              {this.state.page === "manage" ? <Emails /> : []}
            </div>
          </Container>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {};
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
