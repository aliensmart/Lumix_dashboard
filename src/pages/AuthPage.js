import AuthForm from "../components/AuthForm";
import React from "react";

const AuthPage = () => {
  return (
    <div className="authPage">
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
