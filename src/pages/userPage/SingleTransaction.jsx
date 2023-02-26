import React from "react";
import { renderDate } from "../../utils/helpers";

const SingleTransaction = ({ transaction }) => {
  return (
    <div
      className="singleParie"
      style={{
        backgroundColor: transaction?.isDeposit ? "#A8E890" : "#ffbaba",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <h4 style={{ margin: "0" }}>
        {transaction?.isDeposit ? "Depot" : "Retrait"}
      </h4>

      <p>{renderDate(transaction?.addedOn.toDate())}</p>
      <p>{transaction?.amount}</p>
    </div>
  );
};

export default SingleTransaction;
