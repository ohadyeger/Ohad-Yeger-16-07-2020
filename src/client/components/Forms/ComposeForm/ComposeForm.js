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
  Message,
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
      submitSucc: false,
      submitFail: false,
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
    // this.resetForm();
    console.log("submitted new email");
  }

  render() {
    return (
      <React.Fragment>
        <Grid columns="three" divided centered>
          <Grid.Row>
            {/* <Grid.Column></Grid.Column> */}
            <Grid.Column>
              <Segment>
                {this.props.submitSucc ? (
                  <Message positive>
                    <Message.Header>
                      New Message Submitted Successfully
                    </Message.Header>
                    <p>
                      Go to your <b>Manage Emails Page</b> to see your message.
                    </p>
                  </Message>
                ) : (
                  []
                )}
                {this.props.submitFail ? (
                  <Message negative>
                    <Message.Header>
                      New Message Submission Failed
                    </Message.Header>
                    <p>Please try again later.</p>
                  </Message>
                ) : (
                  []
                )}
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
                        this.state.senderId > 0 &&
                        this.state.receiverId > 0
                      )
                    }
                  />
                </Form>
                <br />
              </Segment>
            </Grid.Column>
            {/* <Grid.Column></Grid.Column> */}
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    submitFail: state["composeForm"].get("submitFail"),
    submitSucc: state["composeForm"].get("submitSucc"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewEmail: (emailObj) =>
      dispatch(ComposeFormActions.submitCompose(emailObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComposeForm);
