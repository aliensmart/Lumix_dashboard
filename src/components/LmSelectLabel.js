import React from "react";
import styled from "styled-components";

const LmSelectLabelWrapp = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction ?? "column"};
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
const LmSelect = styled.select`
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

function LmSelectLabel({
  label,
  desc,
  errors,
  register,
  registerObj = {},
  labelName,
  direction,
  options = [],
}) {
  console.log(options);
  return (
    <LmSelectLabelWrapp direction={direction}>
      <LmLabel>{label}</LmLabel>
      {desc && <LmLabelDesc>{desc}</LmLabelDesc>}

      <LmSelect
        {...register(labelName, { ...registerObj })}
        error={errors?.[labelName]}
      >
        {options?.map((el) => {
          return (
            <option key={el?.value} value={el?.value}>
              {el.label}
            </option>
          );
        })}
      </LmSelect>
    </LmSelectLabelWrapp>
  );
}

export default LmSelectLabel;
