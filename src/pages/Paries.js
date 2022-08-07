import React, { useState } from "react";
import Page from "../components/Page";
import MUIDataTable from "mui-datatables";
import { Button, Grid, Stack } from "@mui/material";
import ParieModal from "./paries/ParieModal";

/**
 * This will be the file where Admins can create new challenges
 * @returns DOM
 */
const Paries = () => {
  const [open, setOpen] = useState(false);
  const columns = [
    "Parie Id",
    "Nom",
    "Debut Jeux",
    "fin du Jeux",
    "Paris minimum",
    "status",
    "nombre de parieurs",
    "Total parier",
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const options = {
    filterType: "dropdown",
    responsive: "scroll",
  };

  return (
    <Page title="Paries" breadcrumbs={[{ name: "Paries", active: true }]}>
      <ParieModal
        open={open}
        handleClose={handleClose}
        title={"Ajoutez une parie"}
      />
      <Stack className="_lm-paries" spacing={3}>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item>
            {" "}
            <p>List des Paries</p>
          </Grid>
          <Grid item>
            {" "}
            <Button
              variant="contained"
              size="medium"
              onClick={() => setOpen(true)}
            >
              Creez un Parie
            </Button>
          </Grid>
        </Grid>

        <MUIDataTable
          title={"List des Paries creer"}
          data={[]}
          columns={columns}
          options={options}
        />
      </Stack>
    </Page>
  );
};

export default Paries;
