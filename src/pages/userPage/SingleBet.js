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
        <div className="singleParie-top--icon">{renderStatus()}</div>
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
        <p>{renderGameType()}</p>
      </div>
    </div>
  );
};

export default SingleBet;
