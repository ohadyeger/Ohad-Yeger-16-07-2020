import React from "react";
import {
  Grid,
  List,
  Segment,
  Form,
  TextArea,
  Button,
  Menu,
  Input,
} from "semantic-ui-react";
import { connect } from "react-redux";
import ComposeFormActions from "./actions";

class ComposeForm extends React.Component {
  // componentDidMount() {}

  constructor(props) {
    super(props);

    this.state = {
      subject: "",
      message: "",
      senderId: -1,
      receiverId: -1,
    };

    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSenderIdChange = this.handleSenderIdChange.bind(this);
    this.handleReceiverIdChange = this.handleReceiverIdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }
  resetForm() {
    this.setState({
      subject: "",
      message: "",
      senderId: -1,
      receiverId: -1,
    });
  }
  handleSubjectChange(event) {
    this.setState({
      subject: event.target.value,
    });
  }

  handleContentChange(event) {
    this.setState({
      message: event.target.value,
    });
  }

  handleSenderIdChange(event) {
    this.setState({
      senderId: event.target.value,
    });
  }
  handleReceiverIdChange(event) {
    this.setState({
      receiverId: event.target.value,
    });
  }

  handleSubmit(event) {
    const email = {
      subject: this.state.subject,
      message: this.state.message,
      senderId: this.state.senderId,
      receiverId: this.state.receiverId,
    };
    this.props.submitNewEmail(email);
    this.resetForm();
    console.log("submitted new email");
  }

  render() {
    return (
      <React.Fragment>
        <Segment>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input
                type="number"
                fluid
                label="Sender ID"
                placeholder="to"
                error={this.state.senderId < 1}
                onChange={this.handleSenderIdChange}
                value={this.state.senderId}
              />
              <Form.Input
                type="number"
                fluid
                label="Receiver ID"
                placeholder="from"
                error={this.state.receiverId < 1}
                onChange={this.handleReceiverIdChange}
                value={this.state.receiverId}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="subject"
                placeholder="subject"
                error={this.state.subject == ""}
                onChange={this.handleSubjectChange}
                value={this.state.subject}
              />
            </Form.Group>
            <Form.TextArea
              label="Message"
              placeholder="compose your message here..."
              style={{ minHeight: 100 }}
              onChange={this.handleContentChange}
              value={this.state.message}
              rows={5}
              error={this.state.message == ""}
            />
            {/* <Form.Field>
            <label>Sender ID</label>
            <input
              type="number"
              value={this.state.senderId}
              className="form-control"
              onChange={this.handleSenderIdChange}
              placeholder="sender id"
            />
          </Form.Field>
          <Form.Field>
            <label>Receiver ID</label>
            <input
              type="number"
              value={this.state.receiverId}
              className="form-control"
              onChange={this.handleReceiverIdChange}
              placeholder="receiver id"
            />
          </Form.Field> */}
            {/* <Form.Field> */}
            {/* <label>Subject</label>
            <input
              type="text"
              value={this.state.subject}
              className="form-control"
              onChange={this.handleSubjectChange}
              placeholder="First name"
              // error={this.state.subject == ""}
            />
          </Form.Field> */}
            <Form.Input
              type="submit"
              value="Submit"
              disabled={
                !(
                  this.state.subject &&
                  this.state.message &&
                  this.state.senderId &&
                  this.state.receiverId
                )
              }
            />
          </Form>
          <br />
        </Segment>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    // register_status: state["authenticationForm"].get("register_status"),
    // register_msg: state["authenticationForm"].get("register_msg"),
    // employees: state["employees"].get("employees"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewEmail: (emailObj) =>
      dispatch(ComposeFormActions.submitCompose(emailObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComposeForm);
