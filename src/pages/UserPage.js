import { Grid } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Page from "../components/Page";
import { useBetsQuery } from "../hooks/useBetsQuery";
// import { useSingleUserPariesQuery } from "../hooks/useSingleUserPariesQuery";
import { useSingleUserQuery } from "../hooks/useSingleUserQuery";
import UserDetails from "./userPage/UserDetails";
import UserHistory from "./userPage/UserHistory";

const UserPage = () => {
  const { userId } = useParams();
  const { data: userDetails } = useSingleUserQuery(userId);
  const { data: bets } = useBetsQuery();

  // console.log(bets);
  return (
    <Page className={"_alm-userPage"}>
      <Grid container spacing={3}>
        <Grid item flexBasis={"25rem"} className={"_alm-userPage-details"}>
          <UserDetails userData={userDetails} />
        </Grid>
        <Grid item flexGrow={3} className={"_alm-userPage-histories"}>
          <UserHistory user={userDetails} bets={bets} />
        </Grid>
      </Grid>
    </Page>
  );
};

export default UserPage;
