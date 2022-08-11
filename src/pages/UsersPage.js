import React from "react";
import Page from "../components/Page";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import MUIDataTable from "mui-datatables";
import { useGetUsersQuery } from "../hooks/useGetUsersQuery";
const UsersPage = () => {
  const { data } = useGetUsersQuery();
  console.log(data);
  const columns = [
    "profile",
    "id",
    "Nom Complet",
    "email",
    "Numero De Telephone",
    "montant disponible",
    "total Jouer",
    "code de devise",
    "Nombre de perte",
    "Nombre de gain",
    "Action",
  ];

  const onError = (err) => {
    console.log(err);
  };
  const onSuccess = (s) => {
    console.log(s);
  };

  const handleRowClicked = (rowData, rowMeta) => {
    console.log(rowData);
    console.log(rowMeta);
  };

  const options = {
    filterType: "dropdown",
    onRowClick: handleRowClicked,
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
                // data={data}
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
