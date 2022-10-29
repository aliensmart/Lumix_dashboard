import logo200Image from "../assets/img/logo/logo_200.png";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { onLogin } from "../services";
import { useNavigate } from "react-router-dom";

const AuthForm = ({
  usernameLabel = "Email",
  usernameInputProps = {
    type: "email",
    placeholder: "your@email.com",
  },
  passwordLabel = "Mots de pass",
  passwordInputProps = {
    type: "password",
    placeholder: "Votre mots de pass",
  },
  children,
}) => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const onLog = async (e) => {
    // console.log(password);
    setLoading(true);
    await onLogin(email, password)
      .then((res) => {
        setLoading(false);
        // switch to dashboard
        history("/");
      })
      .catch((err) => {
        setLoading(false);
      });
    setLoading(false);
    e.preventDefault();
  };
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
        <Input
          {...usernameInputProps}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for={passwordLabel}>{passwordLabel}</Label>
        <Input
          {...passwordInputProps}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>

      <Button
        size="lg"
        className="bg-gradient-theme-left border-0"
        block
        onClick={onLog}
        disabled={loading}
      >
        {loading ? "Patientez SVP..." : "Connectez Vous"}
      </Button>
      {children}
    </Form>
  );
};

export default AuthForm;
