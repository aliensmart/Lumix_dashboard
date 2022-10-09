import React from "react";
import empty from "../../assets/empty.jpg";
import { renderDate } from "../../utils/helpers";

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

      <div className="_alm-userPage-details__wrapper-more">
        <div className="userDetail-el">
          <p className="userDetail-el-title">Creer le </p>
          <p className="userDetail-el-par">
            {renderDate(userData?.addedOn?.toDate())}
          </p>
        </div>
        <div className="userDetail-el">
          <p className="userDetail-el-title">Ville </p>
          <p className="userDetail-el-par">{userData?.city}</p>
        </div>
        <div className="userDetail-el">
          <p className="userDetail-el-title">Pays </p>
          <p className="userDetail-el-par">{userData?.countryInfo?.name}</p>
        </div>
        <div className="userDetail-el">
          <p className="userDetail-el-title">Montant Disponible</p>
          <p className="userDetail-el-par">{userData?.availableAmount ?? 0}</p>
        </div>
        <div className="userDetail-el">
          <p className="userDetail-el-title">Total Jouer </p>
          <p className="userDetail-el-par">{userData?.totalGamed ?? 0}</p>
        </div>
        <div className="userDetail-el">
          <p className="userDetail-el-title">Total Deposer </p>
          <p className="userDetail-el-par">{userData?.allDeposit ?? 0}</p>
        </div>
        <div className="userDetail-el">
          <p className="userDetail-el-title">Total Gagner </p>
          <p className="userDetail-el-par">{userData?.totalWon ?? 0}</p>
        </div>

        <div className="userDetail-el">
          <p className="userDetail-el-title">Total Perdu </p>
          <p className="userDetail-el-par">{userData?.totalLost ?? 0}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
