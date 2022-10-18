import React, { useMemo, useState } from "react";
import Page from "../components/Page";
import MUIDataTable from "mui-datatables";
import { Button, Grid, Stack } from "@mui/material";
import ParieModal from "./paries/ParieModal";
import { useBetsQuery } from "../hooks/useBetsQuery";
import { TABLE_TRANSLATE } from "../utils/constants";
import CustomToolbar from "./paries/CustomToolbar";
import PlayModal from "./paries/PlayModal";
import { renderDate } from "../utils/helpers";
import SelectedBetUsers from "./paries/SelectedBetUsers";

/**
 * This will be the file where Admins can create new challenges
 * @returns DOM
 */
const Paries = () => {
  const [open, setOpen] = useState(false);
  const [selectedParie, setSelectedParie] = useState({});
  const [played, setPlayed] = useState(false);
  const [parieId, setParieId] = useState("");
  const [isPlay, setIsPlay] = useState(false);
  const { data } = useBetsQuery();

  const notAllow = useMemo(() => {
    if (!data?.length) return false;
    return data.some((el) => !el.played || el.status !== "ENDED");
  }, [data]);

  const isPlaying = useMemo(() => {
    if (!data?.length) return false;
    return data.some((el) => el.status === "PLAYING");
  }, [data]);

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
        sort: true,
        customBodyRender: (val) => {
          let myStyle = {
            margin: 0,
            color: val ? "green" : "red",
          };

          return <p style={myStyle}>{val ? "OUI" : "NON"}</p>;
        },
      },
    },

    {
      name: "totalBet",
      label: "Montant total Jouer(Francs CFA)",
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
      name: "winnersNumber",
      label: "Nombre de Personne a Gagne",
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
      name: "endsOn",
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
        customBodyRender: (value, tableMeta, updateValue) => {
          return renderDate(value.toDate());
        },
      },
    },
  ];

  // const options = {
  //   filterType: "dropdown",
  //   responsive: "scroll",
  // };

  const handleRowSelectionChange = (
    currentRowsSelected,
    allRowsSelected,
    rowsSelected
  ) => {
    // setSelectedParie(parie);
    console.log(rowsSelected);
    if (rowsSelected.length > 0) {
      const parie = data[currentRowsSelected?.[0]?.dataIndex];
      // setSelectedDevId(userId);
      setPlayed(parie?.played);
      setParieId(parie?.id);
    } else {
      setParieId("");
    }
  };

  const options = {
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "single",
    // onRowClick: (rowData, rowState) => {
    //   console.log(rowData);
    //   console.log(rowState);
    // },
    // setCellProps: () => ({
    //   style: { minWidth: "15rem", padding: "16px 26px", textAlign: "left" },
    // }),
    onRowSelectionChange: handleRowSelectionChange,
    customToolbarSelect: ({ displayData }) => (
      <CustomToolbar
        displayData={displayData}
        played={played}
        setPlayed={setPlayed}
        parieId={parieId}
        setIsPlay={setIsPlay}
      />
    ),

    ...TABLE_TRANSLATE,
  };

  console.log(parieId);
  return (
    <Page className={"_lmParies"}>
      <ParieModal open={open} setOpen={setOpen} title={"Ajoutez une parie"} />
      <PlayModal open={isPlay} setOpen={setIsPlay} parieId={parieId} />
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
            {!notAllow && !isPlaying ? (
              <Button
                variant="contained"
                size="medium"
                onClick={() => setOpen(true)}
              >
                Creez un Parie
              </Button>
            ) : notAllow && isPlaying ? (
              <p>Jeux en Cours</p>
            ) : (
              notAllow &&
              !isPlaying && (
                <p style={{ color: "red" }}>
                  Lancer le Jeux en clickant sur le parie non jouer
                </p>
              )
            )}
          </Grid>
        </Grid>

        <MUIDataTable
          title={"List des Paries creer"}
          data={data}
          columns={columns}
          options={options}
        />
      </Stack>
      {parieId && <SelectedBetUsers betId={parieId} />}
    </Page>
  );
};

export default Paries;
