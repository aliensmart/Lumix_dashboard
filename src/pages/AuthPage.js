import AuthForm from "../components/AuthForm";
import React from "react";
import { Card, Col, Row } from "reactstrap";

const AuthPage = () => {
  return (
    <Row
      style={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Col md={6} lg={4}>
        <Card body>
          <AuthForm />
        </Card>
      </Col>
    </Row>
  );
};

export default AuthPage;
