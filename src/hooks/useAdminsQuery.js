import { colRef, docRef } from "../services";
import { orderBy, query, where } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { useRolesQUery } from "./useRolesData";

export const useAdminsQuery = (onSuccess, onError) => {
  const { data: roles } = useRolesQUery();
  const roleRef = docRef("roles/ADMIN");

  const ref = query(
    colRef("users"),
    where("role", "==", roleRef),
    orderBy("addedOn", "desc")
  );
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
              role: adminData?.role?.id,
              roleRef: adminData?.role,
            };
          });
          return data;
        }
        return [];
      },
    }
  );
};
