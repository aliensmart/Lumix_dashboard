import moment from "moment";
import React, { useState } from "react";
import localization from "moment/locale/fr";
import {
  ArrowBottom2Icon,
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  HorizArrowsIcon,
} from "../../components/Icons";
import styled from "styled-components";

const StatusIcon = styled.div`
  background-color: ${({ status }) =>
    status === "WON" ? "#00C851" : status === "LOST" ? "#FF4444" : "#FFBB33"};

  width: 4rem;
  height: 4rem;
  text-align: center;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StatusText = styled.p`
  color: ${({ status }) =>
    status === "WON" ? "#00C851" : status === "LOST" ? "#FF4444" : "#FFBB33"};
  font-weight: 600;
  filter: brightness(0.6);
`;

const SingleBet = ({ parieDetail }) => {
  const [showDetails, setShowDetails] = useState(false);

  const renderStatus = () => {
    if (parieDetail?.status === "WON") {
      return <ArrowDownIcon />;
    }
    if (parieDetail?.status === "LOST") {
      return <ArrowUpIcon />;
    }
    return <HorizArrowsIcon />;
  };

  const renderGameType = () => {
    if (parieDetail?.status === "WON") {
      return "Jeux Gagner";
    }
    if (parieDetail?.status === "LOST") {
      return "Jeux Perdu";
    }
    return "Jeux En Cours";
  };
  const renderTime = (date) => {
    moment.updateLocale("fr", localization);
    return moment(date).format("llll");
  };

  return (
    <div
      onClick={() => setShowDetails((prev) => !prev)}
      className="singleParie"
    >
      <div className="singleParie-top">
        <StatusIcon status={parieDetail?.status}>{renderStatus()}</StatusIcon>
        <div className="singleParie-top--icon"></div>
        <div className="singleParie-top--info">
          <p>{parieDetail?.gameName}</p>
          <p>{parieDetail?.totalParied} Francs</p>
        </div>
        <div className="singleParie-top--arrow">
          {showDetails ? (
            <ArrowBottom2Icon width={9} height={9} />
          ) : (
            <ArrowRightIcon width={9} height={9} />
          )}
        </div>
      </div>

      {showDetails && (
        <div className="singleParie-details">
          {parieDetail?.paries?.map((parie, i) => {
            return (
              <div
                key={`${parie?.gameName}_${i}`}
                className="singleParie-details-single"
              >
                <p>{renderTime(parie?.pariedOn?.toDate())}</p>
                <p>{parie?.amountParied} Francs</p>
              </div>
            );
          })}
        </div>
      )}
      <div className="singleParie-status">
        <StatusText status={parieDetail?.status}>{renderGameType()}</StatusText>
      </div>
    </div>
  );
};

export default SingleBet;
