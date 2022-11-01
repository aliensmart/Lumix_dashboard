import logo200Image from "../assets/img/logo/logo_200.png";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import {
  addDocument,
  addOrUpdate,
  docRef,
  onLogin,
  onSignUp,
} from "../services";
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

  // const onUserSignUp = async (e) => {
  //   // console.log(password);
  //   setLoading(true);

  //   await onSignUp(email, password)
  //     .then(async (res) => {
  //       setLoading(false);
  //       // switch to dashboard
  //       const roleRef = docRef("/adminStatus/ADMIN");

  //       const adminData = {
  //         email: email,
  //         city: "Abidjan",
  //         createdOn: new Date(),
  //         fullName: "Abdoul Ouakil Kanazoe",
  //         phone: "002250779346498",
  //         profile: "",
  //         role: roleRef,
  //         status: true,
  //       };
  //       addOrUpdate(`admins/${res.user.uid}`, adminData).then((res) => {
  //         history("/");
  //       });
  //       // console.log(res.user);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //     });

  //   setLoading(false);
  // };
  return (
    <Form>
      <div className="text-center pb-4">
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
