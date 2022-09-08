import { Grid } from "@mui/material";
import React from "react";
import FinacialCard from "./FinacialCard";

const FinanceSection = () => {
  return (
    <div className="_dashboard--financial">
      <div className="_dashboard-section">
        <h3>Finance</h3>
      </div>
      <Grid container spacing={2}>
        <Grid item>
          <FinacialCard
            title={"Montant Disponible"}
            content={"400000 francs"}
          />
        </Grid>
        <Grid item>
          <FinacialCard
            title={"Transfere Approuver"}
            content={"30.000 francs"}
          />
        </Grid>
        <Grid item>
          <FinacialCard title={"Total deposer"} content={"500.000 francs"} />
        </Grid>
      </Grid>
    </div>
  );
};

export default FinanceSection;
