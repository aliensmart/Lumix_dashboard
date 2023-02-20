import Page from "../components/Page";
import React, { useEffect } from "react";
// import { Avatar, Grid, Button, Stack } from "@mui/material";
import { useCurrentAdmin } from "../hooks/useCurrentAdmin";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addOrUpdate, colRef, docRef, storage } from "../services";
// import FinacialCard from "./dashboard/FinacialCard";
import { useRolesQUery } from "../hooks/useRolesData";
import FinanceSection from "./dashboard/FinanceSection";
import AdminData from "./dashboard/AdminData";
import AdminsList from "./dashboard/AminsList";
import { useAdminsQuery } from "../hooks/useAdminsQuery";
import { useAdminCheckerQuery } from "../hooks/useAminCheckerQuery";
import { getDoc, onSnapshot, orderBy, query, where } from "firebase/firestore";

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

  // useEffect(() => {
  //   // this is needed, because InfiniteCalendar forces window scroll
  //   window.scrollTo(0, 0);
  // }, []);

  const [pendingTransactions, setPendingTransactions] = React.useState([]);

  useEffect(() => {
    const q = query(
      colRef("transactions", true),
      where("status", "==", "Pending")
      // orderBy("addedOn", "desc")
    );
    const subPending = onSnapshot(q, async (snapshot) => {
      const data = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const parentDocRef = doc.ref.parent.parent;
          const parentDoc = await getDoc(parentDocRef);
          const parentData = parentDoc.data();

          return {
            ref: doc.ref,
            ...doc.data(),
            id: doc.id,
            fullName: parentData?.firstName + " " + parentData?.lastName,
            email: parentData?.email,
            phone: parentData?.phone,
          };
        })
      );

      setPendingTransactions(data);
    });
    return () => {
      subPending();
    };
  }, []);

  console.log("pendingTransactions", pendingTransactions);

  const { data: adminData } = useAdminCheckerQuery();

  const { data } = useCurrentAdmin(adminData?.ref.id);

  const { data: roles } = useRolesQUery();

  return (
    <Page className="_dashboard">
      <AdminData roles={roles} data={data} />
      <FinanceSection />
      <AdminsList admins={pendingTransactions} />
    </Page>
  );
};
export default DashboardPage;
