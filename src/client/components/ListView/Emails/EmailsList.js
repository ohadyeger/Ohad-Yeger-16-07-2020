import React from "react";
import {
  Icon,
  Button,
  Segment,
  Label,
  Breadcrumb,
  Transition,
  Divider,
  List,
} from "semantic-ui-react";

const confirmShow = (id, emailComponent) => () =>
  emailComponent.setState({ confirmOpen: true, confirmId: id });

const EmailsList = (emailComponent, emails) => (
  <Segment>
    <Transition.Group
      as={List}
      duration={200}
      divided
      size="huge"
      verticalAlign="middle"
    >
      {emails.map((email, index) =>
        email ? (
          <List.Item key={index}>
            <List.Content>
              <Breadcrumb>
                <Label>
                  <Icon name="mail" />
                  Subject: {email.subject}
                </Label>
                <Label>From: {email.senderId}</Label>
                <Label>To: {email.receiverId}</Label>
                <Label>
                  Date: {new Date(email.creationDate).toUTCString()}
                </Label>
                <Button
                  size="mini"
                  negative
                  onClick={confirmShow(email._id, emailComponent)}
                >
                  Remove
                </Button>
              </Breadcrumb>

              <p>Message:</p>
              <Segment>{email.message}</Segment>
              <Divider section />
            </List.Content>
          </List.Item>
        ) : (
          []
        )
      )}
    </Transition.Group>
  </Segment>
);
export default EmailsList;
