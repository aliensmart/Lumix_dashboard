import Page from "../components/Page";
import React from "react";
// import { Avatar, Grid, Button, Stack } from "@mui/material";
import { useCurrentAdmin } from "../hooks/useCurrentAdmin";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addOrUpdate, storage } from "../services";
// import FinacialCard from "./dashboard/FinacialCard";
import { useRolesQUery } from "../hooks/useRolesData";
import FinanceSection from "./dashboard/FinanceSection";
import AdminData from "./dashboard/AdminData";
import AdminsList from "./dashboard/AminsList";
import { useAdminsQuery } from "../hooks/useAdminsQuery";
import { useAdminCheckerQuery } from "../hooks/useAminCheckerQuery";

// const today = new Date();
// const lastWeek = new Date(
//   today.getFullYear(),
//   today.getMonth(),
//   today.getDate() - 7
// );

const DashboardPage = () => {
  // componentDidMount() {
  //   // this is needed, because InfiniteCalendar forces window scroll
  //   window.scrollTo(0, 0);
  // }

  const { data: adminData } = useAdminCheckerQuery();

  const { data } = useCurrentAdmin(adminData?.ref.id);

  const { data: roles } = useRolesQUery();

  return (
    <Page className="_dashboard">
      <AdminData roles={roles} data={data} />
      <FinanceSection />
      {/* <AdminsList admins={admins} roles={Object?.values(roles ?? {})} /> */}
    </Page>
  );
};
export default DashboardPage;
