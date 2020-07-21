import React from "react";
import { connect } from "react-redux";
import EmailsActions from "./actions";
import EmailsList from "./EmailsList";
import { Grid, Message, Tab, Segment, Form, Confirm } from "semantic-ui-react";

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
      id: -1,
      remove_email_modal: false,
      chosenEmail: null,
      confirmOpen: false,
      confirmResult: "",
      confirmId: -1,
      deleteFail: false,
      deleteSucc: false,
    };
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
    return () => {
      this.setState({ confirmOpen: false });
      this.props.removeEmail(this.state.confirmId);
    };
  }
  getReceivedMessages = (id) =>
    this.props.emails.filter(filterSentMessages(id));
  getSentMessages = (id) =>
    this.props.emails.filter(filterReceivedMessages(id));

  render() {
    const handleCancel = () =>
      this.setState({ confirmResult: "cancelled", confirmOpen: false });
    return (
      <React.Fragment>
        {this.props.deleteSucc ? (
          <Message positive>
            <Message.Header>Delete Completed Successfully</Message.Header>
            <p>
              Go to your <b>Compose Email Page</b> to add a new message.
            </p>
          </Message>
        ) : (
          []
        )}
        {this.props.deleteFail ? (
          <Message negative>
            <Message.Header>Deleting Message Failed</Message.Header>
            <p>Please try again later.</p>
          </Message>
        ) : (
          []
        )}
        <div>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Confirm
                  content="Are you sure you want to delete this email?"
                  size="mini"
                  open={this.state.confirmOpen}
                  onCancel={handleCancel}
                  onConfirm={this.removeEmail()}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <Grid columns="one" divided centered>
          <Grid.Row>
            {/* <Grid.Column></Grid.Column> */}
            <Grid.Column>
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
              </Form>
              <Segment>
                <Tab
                  panes={[
                    {
                      menuItem: "Received",
                      render: () => (
                        <Tab.Pane>
                          {this.getReceivedMessages(this.state.id)[0]
                            ? EmailsList(
                                this,
                                this.getReceivedMessages(this.state.id)
                              )
                            : "no received messages to show"}
                        </Tab.Pane>
                      ),
                    },
                    {
                      menuItem: "Sent",
                      render: () => (
                        <Tab.Pane>
                          {this.getSentMessages(this.state.id)[0]
                            ? EmailsList(
                                this,
                                this.getSentMessages(this.state.id)
                              )
                            : "no sent messages to show"}
                        </Tab.Pane>
                      ),
                    },
                  ]}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    emails: state["emails"].get("emails"),
    deleteSucc: state["emails"].get("deleteSucc"),
    deleteFail: state["emails"].get("deleteFail"),
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
