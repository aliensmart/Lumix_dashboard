import { colRef } from "../services";
import { orderBy, query, where } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";

export const useAllUsersQuery = (onSuccess, onError) => {
  const ref = query(
    colRef("users"),
    where("isAdmin", "==", false),
    orderBy("lastUpdated", "desc")
  );
  return useFirestoreQuery(
    ["allUsers"],
    ref,
    {
      subscribe: true, // or undefined
    },
    {
      onSuccess,
      onError,
      select: (doc) => {
        console.log(doc);
        if (doc.docs.length >= 1) {
          let data = doc?.docs?.map((dataDoc) => {
            return { ...dataDoc?.data(), id: dataDoc?.id };
          });
          return data;
        }
        return [];
      },
    }
  );
};
