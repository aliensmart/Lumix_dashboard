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

  const adminId = "ETAIhJjsyEhIrRXOJ9Or3g0NJ7E3";

  const { data } = useCurrentAdmin("ETAIhJjsyEhIrRXOJ9Or3g0NJ7E3");

  const { data: roles } = useRolesQUery();

  const { data: admins } = useAdminsQuery();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `admins/${adminId}/profile/${file.name}`);
    const uploadTask = await uploadBytes(storageRef, file);
    const downloaUrl = await getDownloadURL(uploadTask.ref);

    addOrUpdate(`admins/${adminId}`, { profile: downloaUrl });

    e.persist();
  };

  return (
    <Page className="_dashboard">
      <AdminData roles={roles} data={data} handleUpload={handleUpload} />
      <FinanceSection />
      <AdminsList admins={admins} roles={Object?.values(roles ?? {})} />
    </Page>
  );
};
export default DashboardPage;
