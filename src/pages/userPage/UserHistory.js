import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import UserBets from "./UserBets";
import UserTransactions from "./UserTransactions";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const UserHistory = ({ bets }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => setValue(newValue);
  console.log("history");
  return (
    <div className={"_alm-userPage-histories__wrapper"}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Historique des paries" {...a11yProps(0)} />
        <Tab label="Historique des Transaction" {...a11yProps(1)} />
      </Tabs>

      <UserBets value={value} index={0} bets={bets} />
      <UserTransactions value={value} index={1} />
    </div>
  );
};

export default UserHistory;
