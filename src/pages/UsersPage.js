import React, { useState } from "react";
import Page from "../components/Page";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import MUIDataTable from "mui-datatables";
import { useAllUsersQuery } from "../hooks/useAllUsersQuery";
import { TABLE_TRANSLATE } from "../utils/constants";
import CustomToolbarOption from "./users/CustomToolbarOption";

// https://github.com/gregnb/mui-datatables#demo
const UsersPage = () => {
  const { data } = useAllUsersQuery();
  const [selectedDevId, setSelectedDevId] = useState();

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
      name: "availableAmount",
      label: "Montant Disponible",
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
      name: "totalGamed",
      label: "Total Jouer",
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

  const handleRowClicked = (rowData, rowMeta) => {
    console.log(rowData);
    console.log(rowMeta);
  };
  const handleRowSelectionChange = (currentRowsSelected) => {
    const userId = data[currentRowsSelected?.[0]?.dataIndex]?.id;
    setSelectedDevId(userId);
  };

  const options = {
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "single",
    onRowClick: handleRowClicked,
    setCellProps: () => ({
      style: { minWidth: "15rem", padding: "16px 26px", textAlign: "left" },
    }),
    onRowSelectionChange: handleRowSelectionChange,
    customToolbarSelect: ({ displayData }) => (
      <CustomToolbarOption displayData={displayData} userId={selectedDevId} />
    ),
    ...TABLE_TRANSLATE,
  };
  return (
    <Page
      title="Utilisateurs"
      breadcrumbs={[{ name: "Utilisateurs", active: true }]}
    >
      <Row>
        <Col>
          <Card className="mb-3">
            <CardHeader>Utilisateurs</CardHeader>

            <CardBody>
              <MUIDataTable
                title={"List des Utilisateurs"}
                data={data}
                columns={columns}
                options={options}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default UsersPage;
