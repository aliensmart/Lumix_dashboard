import React from "react";
import SingleTransaction from "./SingleTransaction";

const UserTransactions = ({ value, index, transactions }) => {
  return (
    <>
      {value === index && (
        <div
          className={"_alm-userPage-histories__wrapper--trans"}
          style={{ display: "grid", gap: "1rem" }}
        >
          {transactions?.length > 0 ? (
            transactions?.map((trans, i) => {
              return <SingleTransaction transaction={trans} key={trans?.id} />;
            })
          ) : (
            <p>Pas de transaction</p>
          )}
        </div>
      )}
    </>
  );
};

export default UserTransactions;
