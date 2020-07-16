import React from "react";
import { connect } from "react-redux";
import EmailsActions from "./actions";
const dateFormat = require("dateformat");
import {
  Grid,
  List,
  Tab,
  Segment,
  Form,
  Modal,
  TextArea,
  Button,
  Menu,
  Input,
  Confirm,
} from "semantic-ui-react";

function parseDate(str) {
  var mdy = str.split("/");
  return new Date(mdy[2], mdy[0] - 1, mdy[1]);
}

const filterReceivedMessages = (id) => (review) => review.receiverId == id;
const filterSentMessages = (id) => (review) => review.senderId == id;

class Emails extends React.Component {
  componentDidMount() {
    this.props.loadEmails();
    console.log(this.state);
    this.setState();
  }
  constructor(props) {
    super(props);
    this.state = {
      sentEmails: [],
      receivedEmails: [],
      id: -1,
      remove_email_modal: false,
      chosenEmail: null,
      confirmOpen: false,
      confirmResult: "",
      confirmId: -1,
    };
    this.createMailList = this.createMailList.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.getReceivedMessages = this.getReceivedMessages.bind(this);
    this.getSentMessages = this.getSentMessages.bind(this);
    this.openRemoveEmailModal = this.openRemoveEmailModal.bind(this);
    this.closeRemoveEmailModal = this.closeRemoveEmailModal.bind(this);
    this.removeEmail = this.removeEmail.bind(this);
  }

  handleIdChange(event) {
    this.setState({
      id: event.target.value,
    });
  }
  closeRemoveEmailModal(event) {
    this.setState({
      remove_email_modal: false,
    });
  }

  openRemoveEmailModal = (index) => (event) => {
    this.setState({
      chosenEmail: this.props.emails[index]._id,
      remove_email_modal: true,
    });
  };

  removeEmail() {
    // console.log("removing email: ", event);
    // this.closeRemoveEmailModal();

    return () => {
      this.setState({ confirmOpen: false });
      this.props.removeEmail(this.state.confirmId);
    };
  }
  getReceivedMessages = (id) =>
    this.props.emails.filter(filterSentMessages(id));
  getSentMessages = (id) =>
    this.props.emails.filter(filterReceivedMessages(id));

  createMailList = (mails) => (
    <List selection divided>
      {mails.map((email, index) =>
        // <List.Item key={index} onClick={this.openEditor(index)}>
        email ? (
          <List.Item key={index}>
            <List.Icon name="mail" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header as="a">
                <b>{email.subject}</b>
              </List.Header>
              <List.Description as="a">
                from: <i>{email.senderId}</i>
              </List.Description>
              <List.Description as="a">
                to: <i>{email.receiverId}</i>
              </List.Description>

              <List.Content as="a">
                {email.message.length > 50
                  ? email.message.slice(0, 50) + "..."
                  : email.message}
              </List.Content>
            </List.Content>
          </List.Item>
        ) : (
          []
        )
      )}
    </List>
  );
  render() {
    const confirmShow = (id) => () =>
      this.setState({ confirmOpen: true, confirmId: id });
    const handleConfirm = () =>
      this.setState({ confirmResult: "confirmed", confirmOpen: false });
    const handleCancel = () =>
      this.setState({ confirmResult: "cancelled", confirmOpen: false });
    return (
      <React.Fragment>
        <div>
          <Confirm
            open={this.state.confirmOpen}
            onCancel={handleCancel}
            onConfirm={this.removeEmail()}
          />
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Insert ID</label>
            <input
              type="number"
              value={this.state.id}
              className="form-control"
              onChange={this.handleIdChange}
              placeholder="receiver id"
            />
          </Form.Field>
          {/* <input type="submit" value="Submit" /> */}
        </Form>
        <Segment>
          <Tab
            panes={[
              {
                menuItem: "Received",
                render: () => (
                  <Tab.Pane>
                    {this.createMailList(
                      this.getReceivedMessages(this.state.id)
                    )}
                  </Tab.Pane>
                ),
              },
              {
                menuItem: "Sent",
                render: () => (
                  <Tab.Pane>
                    {this.createMailList(this.getSentMessages(this.state.id))}
                  </Tab.Pane>
                ),
              },
            ]}
          />
          <List selection divided>
            {this.props.emails.map((email, index) =>
              // <List.Item key={index} onClick={this.openEditor(index)}>
              email ? (
                <List.Item key={index}>
                  <List.Icon name="mail" size="large" verticalAlign="middle" />
                  <List.Content>
                    <List.Header as="a">
                      <b>{email._id}</b>
                    </List.Header>
                    {/* <List.Description as="a">
                    {board.sensorNum} available sensors
                  </List.Description> */}
                  </List.Content>
                  <List.Content floated="right">
                    <Button negative onClick={confirmShow(email._id)}>
                      Remove
                    </Button>
                  </List.Content>
                </List.Item>
              ) : (
                []
              )
            )}
          </List>
        </Segment>

        {/* <Modal
          show={this.state.remove_email_modal}
          onHide={this.closeRemoveEmailModal}
        >
          <Modal.Header>Warning!</Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to remove Email?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group>
              <Button onClick={this.closeRemoveEmailModal}>No</Button>
              <Button.Or />
              <Button positive onClick={this.removeEmail}>
                Yes
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    emails: state["emails"].get("emails"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadEmails: () => {
      dispatch(EmailsActions.loadEmails());
    },
    removeEmail: (_id) => {
      dispatch(EmailsActions.removeEmail(_id));
    },
  };
};

Emails.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Emails);
