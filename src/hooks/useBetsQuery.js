import { auth, colRef } from "../services";
import { useAuthUser } from "@react-query-firebase/auth";
import { orderBy, query } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";

export const useBetsQuery = (onSuccess, onError) => {
  const ref = query(colRef("bets"), orderBy("addedOn", "desc"));
  return useFirestoreQuery(
    ["allParies"],
    ref,
    {
      subscribe: true, // or undefined
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
    }
  );
};
