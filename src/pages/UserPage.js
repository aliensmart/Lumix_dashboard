import { Grid } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Page from "../components/Page";
import { useSingleUserPariesQuery } from "../hooks/useSingleUserPariesQuery";
import { useSingleUserQuery } from "../hooks/useSingleUserQuery";
import UserHistory from "./userPage/UserHistory";

const UserPage = () => {
  const { userId } = useParams();
  const data = useSingleUserQuery(userId);
  const betData = useSingleUserPariesQuery(userId);
  console.log(userId);
  console.log(data);
  console.log(betData);
  return (
    <Page className={"_alm-userPage"}>
      <Grid container spacing={3}>
        <Grid item flexBasis={"30%"} className={"_alm-userPage-details"}></Grid>
        <Grid item flexBasis={"70%"} className={"_alm-userPage-histories"}>
          <UserHistory bets={betData?.data} />
        </Grid>
      </Grid>
    </Page>
  );
};

export default UserPage;
