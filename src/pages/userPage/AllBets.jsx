import React from "react";
import SingleBetData from "./SingleBetData";

const AllBets = ({ bets, value, index, user }) => {
  return (
    <>
      {value === index &&
        bets?.map((bet, i) => {
          return <SingleBetData bet={bet} user={user} />;
        })}
    </>
  );
};

export default AllBets;
