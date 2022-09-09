import React from "react";
import Page from "../components/Page";

const NoAdminPage = () => {
  return (
    <Page className="_dashboard">
      <div>
        <h3>
          Vous n'etes pas Autoriser a utiliser ce site, contacter
          l'administrateur
        </h3>
      </div>
    </Page>
  );
};

export default NoAdminPage;
