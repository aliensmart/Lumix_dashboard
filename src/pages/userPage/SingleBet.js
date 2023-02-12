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
import { renderDate } from "../../utils/helpers";

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
    if (parieDetail?.status === "ENDED" && !parieDetail?.isChosen) {
      return <ArrowDownIcon />;
    }
    if (parieDetail?.status === "ENDED" && parieDetail?.isChosen) {
      return <ArrowUpIcon />;
    }
    return <HorizArrowsIcon />;
  };

  const renderGameType = () => {
    if (parieDetail?.status === "ENDED" && parieDetail?.isChosen) {
      return "Jeux Gagner";
    }
    if (parieDetail?.status === "ENDED" && !parieDetail?.isChosen) {
      return "Jeux Perdu";
    }
    return "Jeux En Cours";
  };
  const renderTime = (date) => {
    moment.updateLocale("fr", localization);
    return moment(date).format("llll");
  };

  return (
    <div className="singleParie">
      <div className="singleParie-top">
        <StatusIcon
          status={
            parieDetail?.status === "ENDED" && parieDetail?.isChosen
              ? "WON"
              : parieDetail?.status === "ENDED" && parieDetail?.isChosen
              ? "LOST"
              : "PENDING"
          }
        >
          {renderStatus()}
        </StatusIcon>
        <div className="singleParie-top--icon"></div>
        <div className="singleParie-top--info">
          <p>{renderDate(parieDetail.addedOn.toDate())}</p>
          <p>{parieDetail?.betAmount} Francs</p>
        </div>
      </div>

      <div className="singleParie-status">
        <StatusText
          status={
            parieDetail?.status === "ENDED" && parieDetail?.isChosen
              ? "WON"
              : parieDetail?.status === "ENDED" && parieDetail?.isChosen
              ? "LOST"
              : "PENDING"
          }
        >
          {renderGameType()}
        </StatusText>
      </div>
    </div>
  );
};

export default SingleBet;
