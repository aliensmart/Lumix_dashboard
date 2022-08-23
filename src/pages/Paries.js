import React, { useState } from "react";
import Page from "../components/Page";
import MUIDataTable from "mui-datatables";
import { Button, Grid, Stack } from "@mui/material";
import ParieModal from "./paries/ParieModal";
import { useBetsQuery } from "../hooks/useBetsQuery";

/**
 * This will be the file where Admins can create new challenges
 * @returns DOM
 */
const Paries = () => {
  const [open, setOpen] = useState(false);
  const { data } = useBetsQuery();
  console.log(data);
  const columns = [
    "Parie Id",
    "Nom",
    "Jours du Jeux",
    "Paris minimum",
    "status",
    "nombre de parieurs",
    "Total parier",
  ];

  const options = {
    filterType: "dropdown",
    responsive: "scroll",
  };

  return (
    <Page className={"_lmParies"}>
      <ParieModal open={open} setOpen={setOpen} title={"Ajoutez une parie"} />
      <Stack className="_lmParies-container" spacing={3}>
        <Grid
          container
          justifyContent={"space-between"}
          className="_lmParies-container__top"
          alignItems={"center"}
        >
          <Grid item>
            {" "}
            <h3>List des Paries</h3>
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
