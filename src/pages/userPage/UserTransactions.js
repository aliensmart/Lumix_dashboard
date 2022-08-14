import React from "react";
import Collapse from "@kunukn/react-collapse";

const UserTransactions = ({ value, index }) => {
  return (
    <>
      {value === index && (
        <div className={"_alm-userPage-histories__wrapper--trans"}>
          transactions
        </div>
      )}
    </>
  );
};

export default UserTransactions;
