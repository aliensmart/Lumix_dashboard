import { colRef } from "../services";
import { orderBy, query } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { useRolesQUery } from "./useRolesData";

export const useAdminsQuery = (onSuccess, onError) => {
  const { data: roles } = useRolesQUery();

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
          let data = doc?.docs?.map((dataDoc) => {
            const adminData = { ...dataDoc?.data() };
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
