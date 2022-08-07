import React from "react";
import styled from "styled-components";

const LmInputLabelWrapp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const LmLabel = styled.label`
  font-weight: 600;
`;
const LmLabelDesc = styled.p`
  font-size: 12px;
  font-weight: 400;
  opacity: 0.7;
`;
const LmInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: 1px solid black;
  padding: 10px 15px;
  margin-bottom: 10px;
  outline: ${({ error }) => error && "1px solid red"};
  border: ${({ error }) => error && "1px solid red"};
  font-size: 14px;
  // &:focus-visible {
  //   border: 1px solid red;
  //   outline: 2px solid red;
  // }
`;
const LmInputErr = styled.span``;

function LmInputLabel({
  label,
  desc,
  errors,
  register,
  registerObj = {},
  type = "text",
  labelName,
  isValid,
}) {
  console.log(errors);
  console.log(isValid);
  return (
    <LmInputLabelWrapp>
      <LmLabel>{label}</LmLabel>
      {desc && <LmLabelDesc>{desc}</LmLabelDesc>}
      <LmInput
        type={type}
        {...register(labelName, { ...registerObj })}
        error={errors?.[labelName]}
      />
      {/* {errors?.[labelName]?.type === "required" && (
        <LmInputErr>{label} is Required</LmInputErr>
      )} */}
    </LmInputLabelWrapp>
  );
}

export default LmInputLabel;
