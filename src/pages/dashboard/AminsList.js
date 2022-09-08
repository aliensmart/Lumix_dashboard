import { Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import React, { useMemo, useState } from "react";
import { TABLE_TRANSLATE } from "../../utils/constants";
import InviteDialog from "./InviteDialog";

const AdminsList = ({ admins, roles }) => {
  console.log(Object.values(roles));
  const [open, setOpen] = useState(false);
  const rolesList = useMemo(() => {
    if (roles?.length <= 0) return;
    return roles?.map((role) => {
      return { value: role?.status, ref: role?.ref, label: role?.status };
    });
  }, [roles?.length]);
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
      name: "city",
      label: "Ville",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({
          style: {
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
      name: "phoneNumber",
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
      name: "role",
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
      <InviteDialog open={open} onClose={onClose} roles={rolesList} />
      <div className="_dashboard-section">
        <h3>List des Administrateur</h3>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Invitez un Administrateur
        </Button>
      </div>
      <MUIDataTable columns={columns} data={admins} options={options} />
    </div>
  );
};

export default AdminsList;
