import React, { useState } from "react";
import Page from "../components/Page";
import MUIDataTable from "mui-datatables";
import { Button, Grid, Stack } from "@mui/material";
import ParieModal from "./paries/ParieModal";
import { useBetsQuery } from "../hooks/useBetsQuery";
import { TABLE_TRANSLATE } from "../utils/constants";

/**
 * This will be the file where Admins can create new challenges
 * @returns DOM
 */
const Paries = () => {
  const [open, setOpen] = useState(false);
  const { data } = useBetsQuery();
  console.log(data);

  const columns = [
    {
      name: "id",
      label: "Parie Id",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { minWidth: "10rem" } }),
      },
    },
    {
      name: "betName",
      label: "Parie",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({
          style: {
            minWidth: "15rem",
            padding: "16px 26px",
            textAlign: "left",
            whiteSpace: "nowrap",
          },
        }),
      },
    },
    {
      name: "played",
      label: "Jouer",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          style: {
            textAlign: "left",
            whiteSpace: "nowrap",
          },
        }),
      },
    },

    {
      name: "minBet",
      label: "Prix Minimum de Parie",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          style: {
            minWidth: "15rem",
            padding: "16px 26px",
            textAlign: "left",
            whiteSpace: "nowrap",
          },
        }),
      },
    },
    {
      name: "winnersNumber",
      label: "Nombre de Personne a Gagne",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          style: {
            minWidth: "15rem",
            padding: "16px 26px",
            textAlign: "left",
            whiteSpace: "nowrap",
          },
        }),
      },
    },
    {
      name: "beters",
      label: "Nombre de Joueur",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({
          style: {
            minWidth: "15rem",
            padding: "16px 26px",
            textAlign: "left",
            whiteSpace: "nowrap",
          },
        }),
      },
    },
    {
      name: "betDay",
      label: "Jour de Jeux",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({
          style: {
            minWidth: "15rem",
            padding: "16px 26px",
            textAlign: "left",
            whiteSpace: "nowrap",
          },
        }),
      },
    },
    // {
    //   name: "addedOn",
    //   label: "creer le",
    //   options: {
    //     filter: true,
    //     sort: false,
    //     setCellProps: () => ({
    //       style: {
    //         minWidth: "15rem",
    //         padding: "16px 26px",
    //         textAlign: "left",
    //         whiteSpace: "nowrap",
    //       },
    //     }),
    //   },
    // },
  ];

  // const options = {
  //   filterType: "dropdown",
  //   responsive: "scroll",
  // };

  const options = {
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "single",
    // onRowClick: handleRowClicked,
    // setCellProps: () => ({
    //   style: { minWidth: "15rem", padding: "16px 26px", textAlign: "left" },
    // }),
    // onRowSelectionChange: handleRowSelectionChange,
    // customToolbarSelect: ({ displayData }) => (
    //   <CustomToolbarOption displayData={displayData} userId={selectedDevId} />
    // ),
    ...TABLE_TRANSLATE,
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
          data={data}
          columns={columns}
          options={options}
        />
      </Stack>
    </Page>
  );
};

export default Paries;
