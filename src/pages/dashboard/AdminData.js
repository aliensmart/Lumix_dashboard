import { Avatar, Button, Grid } from "@mui/material";
import React from "react";
import empty from "../../assets/empty.jpg";

const AdminData = ({ data, handleUpload, roles }) => {
  return (
    <Grid container spacing={1} direction="row">
      <Grid
        item
        sx={{ minWidth: "210px" }}
        flexBasis={"20%"}
        container
        spacing={2}
        direction="column"
        xs={12}
        sm={4}
      >
        <Grid item>
          {data?.profile ? (
            <Avatar
              alt={data?.fullName}
              src={data?.profile}
              sx={{ width: 200, height: 200 }}
            />
          ) : (
            <Avatar
              alt={data?.fullName}
              src={empty}
              sx={{ width: 200, height: 200 }}
            />
          )}
        </Grid>
      </Grid>
      <Grid
        item
        container
        spacing={2}
        direction="column"
        flexGrow={3}
        flexBasis={"70%"}
        sx={{ minWidth: "none" }}
        xs={12}
        sm={8}
      >
        <Grid item>
          <p>
            <strong>Nom Complet: </strong>
            {data?.fullName}
          </p>
        </Grid>
        <Grid item>
          <p>
            <strong>Role: </strong>
            {roles?.[data?.role?.id]?.status}
          </p>
        </Grid>
        <Grid item>
          <p>
            <strong>Email: </strong>
            {data?.email}
          </p>
        </Grid>
        <Grid item>
          <p>
            <strong>Numero de Tel: </strong>
            {data?.phone}
          </p>
        </Grid>
        <Grid item>
          <p>
            <strong>Ville: </strong>
            {data?.city}
          </p>
        </Grid>
        <Grid item>
          <p>
            <strong>Pays: </strong>
            {data?.countryData?.name?.common}
          </p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminData;
