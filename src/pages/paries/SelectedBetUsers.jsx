import React from "react";
import { renderDate } from "../../utils/helpers";

const SelectedBetUsers = ({ betId }) => {
  console.log(betId);
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
      name: "beterName",
      label: "Nom Du Parieur",
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
  return (
    <div>
      <h3>Les parieurs de ce jeux</h3>
    </div>
  );
};

export default SelectedBetUsers;
