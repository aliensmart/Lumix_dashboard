import React from "react";

const UserTransactions = ({ value, index }) => {
  return (
    <>
      {value === index && (
        <div className={"_alm-userPage-histories__wrapper--trans"}>
          Pas de transactions
        </div>
      )}
    </>
  );
};

export default UserTransactions;
