import AuthForm from "../components/AuthForm";
import React from "react";
import { Card, Col, Row } from "reactstrap";
import Page from "../components/Page";

const AuthPage = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#F2F5F7",
        // color: "white",
      }}
    >
      <div
        style={{
          padding: "2rem",
          borderRadius: "5px",
          backgroundColor: "white",
          boxShadow: "-3px 9px 22px 2px rgba(0,0,0,0.26)",
        }}
      >
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;
