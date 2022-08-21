import { colRef } from "../services";
import { orderBy, query } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { useRolesQUery } from "./useRolesData";

export const useAdminsQuery = (onSuccess, onError) => {
  const { data: roles } = useRolesQUery();
  console.log(roles);
  const ref = query(colRef("admins"), orderBy("createdOn", "desc"));
  return useFirestoreQuery(
    ["adminsList"],
    ref,
    {
      subscribe: true,
      source: "cache", // or undefined
    },
    {
      onSuccess,
      onError,
      select: (doc) => {
        if (doc.docs.length >= 1) {
          console.log();
          let data = doc?.docs?.map((dataDoc) => {
            console.log(dataDoc);
            const adminData = { ...dataDoc?.data() };
            console.log(adminData);
            return {
              ...adminData,
              id: dataDoc?.id,
              role: roles[adminData?.role?.id]?.status,
            };
          });
          return data;
        }
        return [];
      },
    }
  );
};
