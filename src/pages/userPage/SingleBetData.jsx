import React from "react";
import { useBetRender } from "../../hooks/useBetRender";
import { renderDate } from "../../utils/helpers";
import SingleBet from "./SingleBet";

const SingleBetData = ({ bet, user }) => {
  const { data: betData } = useBetRender(bet?.ref, user);
  return (
    <>
      {betData?.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h5>{bet?.betName}</h5>
            <p>{renderDate(bet?.endsOn?.toDate())}</p>
          </div>
          <div style={{ display: "grid", gap: "2rem" }}>
            {betData?.map((userBet, i) => {
              return <SingleBet parieDetail={userBet} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default SingleBetData;
