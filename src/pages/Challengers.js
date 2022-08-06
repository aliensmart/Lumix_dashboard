import React from "react";
import Page from "../components/Page";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import MUIDataTable from "mui-datatables";

// TODO
// https://codesandbox.io/s/mui-datatables-server-side-pagination-with-unknown-number-of-items-2v7wd
// https://codesandbox.io/s/x33ok?file=/index.js:460-469
// https://codesandbox.io/s/8kkqw9078?file=/index.js
// https://codesandbox.io/s/p5m1m1kwwq
// https://codesandbox.io/s/muidatatables-resize-columns-example-zomv5?file=/index.js:2088-2110

/**
 * This Page will list all challengers and Admin can remove or block a challenger
 * @returns
 */
const Challengers = () => {
  const columns = ["id", "Username", "Rate", "Total Score", "Action"];

  // const columns = [
  //   {
  //     name: "Name",
  //     options: {
  //       filter: false,
  //     },
  //   },
  //   {
  //     name: "Title",
  //     options: {
  //       filter: true,
  //     },
  //   },
  //   {
  //     name: "Location",
  //     options: {
  //       filter: true,
  //       customBodyRender: (value, tableMeta, updateValue) => {
  //         return (
  //           <Cities
  //             value={value}
  //             index={tableMeta.columnIndex}
  //             change={(event) => updateValue(event)}
  //           />
  //         );
  //       },
  //     },
  //   },
  //   {
  //     name: "Age",
  //     options: {
  //       filter: false,
  //     },
  //   },
  //   {
  //     name: "Salary",
  //     options: {
  //       filter: true,
  //       customBodyRender: (value, tableMeta, updateValue) => {
  //         const nf = new Intl.NumberFormat("en-US", {
  //           style: "currency",
  //           currency: "USD",
  //           minimumFractionDigits: 2,
  //           maximumFractionDigits: 2,
  //         });

  //         return nf.format(value);
  //       },
  //     },
  //   },
  //   {
  //     name: "Active",
  //     options: {
  //       filter: true,
  //       customBodyRender: (value, tableMeta, updateValue) => {
  //         return (
  //           <FormControlLabel
  //             label={value ? "Yes" : "No"}
  //             value={value ? "Yes" : "No"}
  //             control={
  //               <Switch
  //                 color="primary"
  //                 checked={value}
  //                 value={value ? "Yes" : "No"}
  //               />
  //             }
  //             onChange={(event) => {
  //               updateValue(event.target.value === "Yes" ? false : true);
  //             }}
  //           />
  //         );
  //       },
  //     },
  //   },
  // ];

  const data = [
    ["Gabby George", "Business Analyst", "Minneapolis", 30, "$100,000"],
    ["Aiden Lloyd", "Business Consultant", "Dallas", 55, "$200,000"],
    ["Jaden Collins", "Attorney", "Santa Ana", 27, "$500,000"],
    ["Franky Rees", "Business Analyst", "St. Petersburg", 22, "$50,000"],
    ["Aaren Rose", "Business Consultant", "Toledo", 28, "$75,000"],
    ["Blake Duncan", "Business Management Analyst", "San Diego", 65, "$94,000"],
    ["Frankie Parry", "Agency Legal Counsel", "Jacksonville", 71, "$210,000"],
    ["Lane Wilson", "Commercial Specialist", "Omaha", 19, "$65,000"],
    ["Robin Duncan", "Business Analyst", "Los Angeles", 20, "$77,000"],
    ["Mel Brooks", "Business Consultant", "Oklahoma City", 37, "$135,000"],
    ["Harper White", "Attorney", "Pittsburgh", 52, "$420,000"],
    ["Kris Humphrey", "Agency Legal Counsel", "Laredo", 30, "$150,000"],
    ["Frankie Long", "Industrial Analyst", "Austin", 31, "$170,000"],
    ["Brynn Robbins", "Business Analyst", "Norfolk", 22, "$90,000"],
    ["Justice Mann", "Business Consultant", "Chicago", 24, "$133,000"],
    [
      "Addison Navarro",
      "Business Management Analyst",
      "New York",
      50,
      "$295,000",
    ],
    ["Jesse Welch", "Agency Legal Counsel", "Seattle", 28, "$200,000"],
    ["Eli Mejia", "Commercial Specialist", "Long Beach", 65, "$400,000"],
    ["Gene Leblanc", "Industrial Analyst", "Hartford", 34, "$110,000"],
    ["Danny Leon", "Computer Scientist", "Newark", 60, "$220,000"],
    ["Lane Lee", "Corporate Counselor", "Cincinnati", 52, "$180,000"],
    ["Jesse Hall", "Business Analyst", "Baltimore", 44, "$99,000"],
    ["Danni Hudson", "Agency Legal Counsel", "Tampa", 37, "$90,000"],
    ["Terry Macdonald", "Commercial Specialist", "Miami", 39, "$140,000"],
    ["Justice Mccarthy", "Attorney", "Tucson", 26, "$330,000"],
    ["Silver Carey", "Computer Scientist", "Memphis", 47, "$250,000"],
    ["Franky Miles", "Industrial Analyst", "Buffalo", 49, "$190,000"],
    ["Glen Nixon", "Corporate Counselor", "Arlington", 44, "$80,000"],
    [
      "Gabby Strickland",
      "Business Process Consultant",
      "Scottsdale",
      26,
      "$45,000",
    ],
    ["Mason Ray", "Computer Scientist", "San Francisco", 39, "$142,000"],
  ];

  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    resizableColumns: true,
    selectableRows: true,
  };
  return (
    <Page
      title="Challengeurs"
      breadcrumbs={[{ name: "Challengeurs", active: true }]}
    >
      <Row>
        <Col>
          <Card className="mb-3">
            <CardHeader>Challengers</CardHeader>

            <CardBody>
              <MUIDataTable
                title={"List des Challengeurs"}
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

export default Challengers;
