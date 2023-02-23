import Page from "../components/Page";
import React, { useEffect } from "react";
// import { Avatar, Grid, Button, Stack } from "@mui/material";
import { useCurrentAdmin } from "../hooks/useCurrentAdmin";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addOrUpdate,
  colRef,
  docRef,
  docReference,
  storage,
} from "../services";
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
  const [pendingTransactions, setPendingTransactions] = React.useState([]);
  const [lumixData, setLumixData] = React.useState(null);

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

    const subLumixData = onSnapshot(
      docReference("/lumixData/nLUpoDEbLI0jaxcSJ7oG"),
      (doc) => {
        console.log("doc", doc.data());
        setLumixData({ ...doc.data(), ref: doc.ref });
      }
    );

    return () => {
      subPending();
      subLumixData();
    };
  }, []);

  // console.log("pendingTransactions", pendingTransactions);

  const { data: adminData } = useAdminCheckerQuery();

  const { data } = useCurrentAdmin(adminData?.ref.id);

  const { data: roles } = useRolesQUery();

  console.log("roles", roles);
  console.log("data", data);

  return (
    <Page className="_dashboard">
      <AdminData roles={roles} data={data} />
      {data?.role?.id === "ADMIN" ||
        (data?.role?.id === "SUPER-ADMIN" && (
          <FinanceSection data={lumixData} />
        ))}

      <AdminsList admins={pendingTransactions} />
    </Page>
  );
};
export default DashboardPage;
