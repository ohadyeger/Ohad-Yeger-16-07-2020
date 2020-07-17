import React from "react";
import {
  Accordion,
  Icon,
  Button,
  Segment,
  Label,
  Item,
  Breadcrumb,
  Container,
  Divider,
  Message,
  Grid,
} from "semantic-ui-react";
// const handleClick = (index) => (state.accordionIndex = index);
const confirmShow = (id, emailComponent) => () =>
  emailComponent.setState({ confirmOpen: true, confirmId: id });
const EmailsList = (emailComponent, emails) => (
  <Segment>
    {/* <Accordion styled fluid> */}
    {emails.map((email, index) =>
      email ? (
        <Container key={index}>
          <Breadcrumb>
            <Label>
              <Icon name="mail" />
              Subject: {email.subject}
            </Label>
            <Label>From: {email.senderId}</Label>
            <Label>To: {email.receiverId}</Label>
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
        </Container>
      ) : (
        []
      )
    )}
  </Segment>
);
export default EmailsList;
