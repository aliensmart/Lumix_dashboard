import React from "react";
import SingleBet from "./SingleBet";

const UserBets = ({ value, index, bets }) => {
  console.log(bets);
  return (
    <>
      {value === index && (
        <div className={"_alm-userPage-histories__wrapper--bets"}>
          <SingleBet parieDetail={bets?.[0]} />
        </div>
      )}
    </>
  );
};

export default UserBets;
