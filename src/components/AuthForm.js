import logo200Image from "../assets/img/logo/logo_200.png";
import PropTypes from "prop-types";
import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const AuthForm = ({
  usernameLabel = "Email",
  usernameInputProps = {
    type: "email",
    placeholder: "your@email.com",
  },
  passwordLabel = "Mots de pass",
  passwordInputProps = {
    type: "Mots de pass",
    placeholder: "Votre mots de pass",
  },
  children,
}) => {
  return (
    <Form>
      <div className="text-center pb-4">
        {/* <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              onClick={onLogoClick}
            /> */}
        <p>LUMIX</p>
      </div>
      <FormGroup>
        <Label for={usernameLabel}>{usernameLabel}</Label>
        <Input {...usernameInputProps} />
      </FormGroup>
      <FormGroup>
        <Label for={passwordLabel}>{passwordLabel}</Label>
        <Input {...passwordInputProps} />
      </FormGroup>
      {/* <FormGroup check>
        <Label check>
          <Input type="checkbox" />{" "}
          {this.isSignup ? "Agree the terms and policy" : "Remember me"}
        </Label>
      </FormGroup> */}
      <hr />
      <Button
        size="lg"
        className="bg-gradient-theme-left border-0"
        block
        // onClick={this.handleSubmit}
      >
        Connectez Vous
      </Button>
      {children}
    </Form>
  );
};

export default AuthForm;
