import { Grid } from "@mui/material";
import React from "react";
import FinacialCard from "./FinacialCard";

const FinanceSection = ({ data }) => {
  return (
    <div className="_dashboard--financial">
      <div className="_dashboard-section">
        <h3>Finance</h3>
      </div>
      <Grid container spacing={2}>
        <Grid item>
          <FinacialCard
            title={"Montant Disponible"}
            content={`${data?.availableAmount ?? 0} francs`}
          />
        </Grid>
        <Grid item>
          <FinacialCard
            title={"Transfert Approuver"}
            content={`${data?.approvedTransfer ?? 0} francs`}
          />
        </Grid>
        <Grid item>
          <FinacialCard
            title={"Total des depots"}
            content={`${data?.allDeposit ?? 0} francs`}
          />
        </Grid>
        <Grid item>
          <FinacialCard
            title={"Total des Jeux"}
            content={`${data?.totalGamed ?? 0} francs`}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default FinanceSection;
