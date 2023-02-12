import { MenuItem, Select } from "@mui/material";
import React, { useEffect } from "react";
import empty from "../../assets/empty.jpg";
import { renderDate } from "../../utils/helpers";
import { addOrUpdate } from "../../services";

const UserDetails = ({ userData, allRoles }) => {
  const [role, setRole] = React.useState({
    label: allRoles?.[userData?.role?.id]?.label,
    value: allRoles?.[userData?.role?.id]?.ref?.id,
    ref: allRoles?.[userData?.role?.id]?.ref,
  });
  const handleChange = (event) => {
    console.log(event.target.value);
    setRole({
      label: allRoles?.[event.target.value]?.label,
      value: allRoles?.[event.target.value]?.ref?.id,
      ref: allRoles?.[event.target.value]?.ref,
    });

    addOrUpdate(userData?.ref?.path, {
      role: allRoles?.[event.target.value]?.ref,
    });
  };
  console.log(userData);

  useEffect(() => {
    console.log(role);
    if (userData?.role?.id !== role?.value) {
      console.log("change role");
      setRole({
        label: allRoles?.[userData?.role?.id]?.label,
        value: allRoles?.[userData?.role?.id]?.ref?.id,
        ref: allRoles?.[userData?.role?.id]?.ref,
      });
    } else {
      console.log("no change");
    }
  }, [userData?.role?.id]);

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
        <p>{allRoles?.[userData?.role?.id]?.label}</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          // justifyContent: "space-between",
          gap: "1rem",
          flexDirection: "column",
        }}
      >
        <p>Changez son role</p>
        {userData?.role?.id && allRoles?.[userData?.role?.id]?.label && (
          <Select value={role?.label} onChange={handleChange}>
            {Object.values(allRoles)?.map((role) => (
              // <option value={role?.ref?.id}>{role?.label}</option>
              <MenuItem value={role?.ref?.id}>{role?.label}</MenuItem>
            ))}
          </Select>
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
          <p className="userDetail-el-par">
            {userData?.countryData?.name?.common}
          </p>
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
