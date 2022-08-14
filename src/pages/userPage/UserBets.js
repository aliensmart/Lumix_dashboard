import React from "react";
import SingleBet from "./SingleBet";

const UserBets = ({ value, index, bets }) => {
  console.log(bets);
  return (
    <>
      {value === index && (
        <div className={"_alm-userPage-histories__wrapper--bets"}>
          {bets?.length > 0 ? (
            <>
              {bets.map((bet, i) => {
                return <SingleBet key={bet?.name} parieDetail={bet} />;
              })}
            </>
          ) : (
            <p>Pas de Parie</p>
          )}
        </div>
      )}
    </>
  );
};

export default UserBets;
