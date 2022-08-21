import { Paper } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Item = styled(Paper)`
  padding: 0.5rem 1rem;

  h3 {
    font-size: 18px;
    font-weight: 600;
  }
`;

const FinacialCard = ({ title, content }) => {
  return (
    <Item elevation={3}>
      <h3>{title}</h3>
      <p>{content}</p>
    </Item>
  );
};

export default FinacialCard;
