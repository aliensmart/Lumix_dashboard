import { Grid } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Page from "../components/Page";
import { useSingleUserPariesQuery } from "../hooks/useSingleUserPariesQuery";
import { useSingleUserQuery } from "../hooks/useSingleUserQuery";

const UserPage = () => {
  const { userId } = useParams();
  const data = useSingleUserQuery(userId);
  const betData = useSingleUserPariesQuery(userId);
  console.log(userId);
  console.log(data);
  console.log(betData);
  return (
    <Page>
      <Grid container spacing={3}>
        <Grid item flexBasis={"30%"}></Grid>
        <Grid item flexBasis={"70%"}></Grid>
      </Grid>
    </Page>
  );
};

export default UserPage;
