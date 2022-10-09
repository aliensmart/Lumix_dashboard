import React from "react";
import { renderDate } from "../../utils/helpers";

const SingleBetData = ({ bet, user }) => {
  console.log(user);
  console.log(bet);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h5>{bet?.betName}</h5>
        <p>{renderDate(bet?.endsOn?.toDate())}</p>
      </div>
    </div>
  );
};

export default SingleBetData;
