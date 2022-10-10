import { colRef } from "../services";
import { orderBy, query } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";

export const useUserTransactions = (userId, onSuccess, onError) => {
  const ref = query(
    colRef(`users/${userId}/transactions`),
    orderBy("addedOn", "desc")
  );

  return useFirestoreQuery(
    ["singleUserTrans", userId],
    ref,
    {
      subscribe: true, // or undefined
      includeMetadataChanges: true,
      source: "cache",
    },
    {
      onSuccess,
      onError,
      select: (doc) => {
        if (doc.docs.length >= 1) {
          let data = doc?.docs?.map((dataDoc) => {
            return { ...dataDoc?.data(), id: dataDoc?.id };
          });
          return data;
        }
        return [];
      },
      enabled: !!userId,
    }
  );
};
