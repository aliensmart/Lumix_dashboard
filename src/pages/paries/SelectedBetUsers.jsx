import MUIDataTable from "mui-datatables";
import React from "react";
import { useBetUsers } from "../../hooks/useBetUsers";
import { TABLE_TRANSLATE } from "../../utils/constants";
import { renderDate } from "../../utils/helpers";

const SelectedBetUsers = ({ betId }) => {
  // console.log(betId);
  const { data } = useBetUsers(betId);

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
      name: "beterId",
      label: "Id du Parieur",
      options: {
        filter: true,
        sort: true,
        // customBodyRender: (val) => {
        //   let myStyle = {
        //     margin: 0,
        //     color: val ? "green" : "red",
        //   };

        //   return <p style={myStyle}>{val ? "OUI" : "NON"}</p>;
        // },
      },
    },
    {
      name: "betAmount",
      label: "Montant Jouer(Francs CFA)",
      options: {
        filter: true,
        sort: true,
        // customBodyRender: (val) => {
        //   let myStyle = {
        //     margin: 0,
        //     color: val ? "green" : "red",
        //   };

        //   return <p style={myStyle}>{val ? "OUI" : "NON"}</p>;
        // },
      },
    },

    {
      name: "won",
      label: "Montant Gagner(Francs CFA)",
      options: {
        filter: true,
        sort: true,
        // setCellProps: () => ({
        //   style: {
        //     minWidth: "15rem",
        //     padding: "16px 26px",
        //     textAlign: "left",
        //     whiteSpace: "nowrap",
        //   },
        // }),
      },
    },

    {
      name: "addedOn",
      label: "Parier le",
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
  const options = {
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "single",

    ...TABLE_TRANSLATE,
  };
  return (
    <div style={{ marginTop: "5rem" }}>
      <h3 style={{ marginBottom: "2rem" }}>
        Les paries de ce Jeux({data?.length})
      </h3>
      <MUIDataTable
        title={"List de tous les paries"}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default SelectedBetUsers;
