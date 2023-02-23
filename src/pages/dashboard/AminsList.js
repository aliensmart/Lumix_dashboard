import { Button } from "@mui/material";
import { increment, updateDoc } from "firebase/firestore";
import MUIDataTable from "mui-datatables";
import React, { useMemo, useState } from "react";
import { docReference } from "../../services";
import { TABLE_TRANSLATE } from "../../utils/constants";
import InviteDialog from "./InviteDialog";

const AdminsList = ({ admins }) => {
  const [open, setOpen] = useState(false);

  const roles = [
    { label: "En attente", value: "Pending" },
    { label: "Complet", value: "In Progress" },
    // { label: "Terminé", value: "Completed" },
    // { label: "Annulé", value: "Cancelled" },
  ];
  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { minWidth: "10rem" } }),
      },
    },
    {
      name: "fullName",
      label: "Nom Complete",
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
      name: "amount",
      label: "Montant(XOF)",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({
          style: {
            // minWidth: "15rem",
            padding: "16px 26px",
            textAlign: "left",
            whiteSpace: "nowrap",
          },
        }),
      },
    },
    {
      name: "email",
      label: "EMAIL",
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
      name: "phone",
      label: "NUMERO DE TELEPHONE",
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
      name: "status",
      label: "ROLE",
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
          const role = roles?.find((role) => role?.value === value);
          // console.log(value);
          // console.log(tableMeta);
          // console.log(updateValue);
          const transferRef = admins.find(
            (data) => data.id === tableMeta.rowData[0]
          )?.ref;
          // console.log(transferRef);
          return (
            <select
              value={role?.value}
              onChange={(e) => {
                e.stopPropagation();
                updateValue(e.target.value);
                updateDoc(transferRef, {
                  status: e.target.value,
                });
                const userRef = docReference(transferRef?.parent?.parent?.path);
                console.log(userRef);
                // add approvedTransfer with increased amount to the lumix data and decrease the available amount
                updateDoc(docReference("/lumixData/nLUpoDEbLI0jaxcSJ7oG"), {
                  approvedTransfer: increment(tableMeta.rowData[2]),
                  availableAmount: increment(-tableMeta.rowData[2]),
                });
                // add approvedTransfer with increased amount to the user data and decrease the available amount
                updateDoc(userRef, {
                  approvedTransfer: increment(tableMeta.rowData[2]),
                  availableAmount: increment(-tableMeta.rowData[2]),
                });
              }}
            >
              <option value={role?.value}>{role?.label}</option>
              {roles
                ?.filter((el) => el.value !== role.value)
                ?.map((role) => {
                  return <option value={role?.value}>{role?.label}</option>;
                })}
            </select>
          );
        },
      },
    },
  ];
  const options = {
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "single",
    //   onRowClick: handleRowClicked,
    //   setCellProps: () => ({
    //     style: { minWidth: "15rem", padding: "16px 26px", textAlign: "left" },
    //   }),
    //   onRowSelectionChange: handleRowSelectionChange,
    //   customToolbarSelect: ({ displayData }) => (
    //     <CustomToolbarOption displayData={displayData} userId={selectedDevId} />
    //   ),
    ...TABLE_TRANSLATE,
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="_dashboard--admins">
      <div className="_dashboard-section">
        <h3>List des retrait en entente</h3>
      </div>
      <MUIDataTable columns={columns} data={admins} options={options} />
    </div>
  );
};

export default AdminsList;
