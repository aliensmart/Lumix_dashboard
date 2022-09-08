import React from "react";
import SingleBet from "./SingleBet";

const UserBets = ({ value, index, bets }) => {
  return (
    <>
      {value === index && (
        <div className={"_alm-userPage-histories__wrapper--bets"}>
          {bets?.length > 0 && (
            <div>
              <p>
                Nombre de Paries <strong>{bets?.length}</strong>
              </p>
            </div>
          )}
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
