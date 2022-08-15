import React from "react";
import empty from "../../assets/empty.jpg";

const UserDetails = ({ userData }) => {
  return (
    <div className="_alm-userPage-details__wrapper">
      <div className="_alm-userPage-details__wrapper-info">
        <div className="_alm-userPage-details__wrapper-info-profile">
          {userData?.profile ? (
            <img
              src={userData?.profile}
              alt={userData?.fullName?.split(" ").join("")}
            />
          ) : (
            <img src={empty} alt={userData?.fullName?.split(" ").join("")} />
          )}
        </div>
      </div>
      <div className="_alm-userPage-details__wrapper-nameEmai">
        <p className="userfullName">{userData?.fullName}</p>
        {userData?.email && <p className="email">{userData?.email}</p>}
        {userData?.phoneNumber && (
          <p className="email">{userData?.phoneNumber}</p>
        )}
      </div>

      <div></div>
    </div>
  );
};

export default UserDetails;
