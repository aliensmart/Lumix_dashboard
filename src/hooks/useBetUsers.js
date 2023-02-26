import { colRef } from "../services";
import { orderBy, query } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";

export const useBetUsers = (betId) => {
  const ref = query(
    colRef(`bets/${betId}/usersBets`),
    orderBy("addedOn", "desc")
  );
  // console.log(betId);
  return useFirestoreQuery(
    ["singleBetsUsers", betId],
    ref,
    {
      subscribe: true, // or undefined
    },
    {
      select: (doc) => {
        if (doc.docs.length >= 1) {
          let data = doc?.docs?.map((dataDoc) => {
            return {
              ...dataDoc?.data(),
              id: dataDoc?.id,
              ref: dataDoc?.ref,
              beterId: dataDoc?.data()?.playerRef?.id,
            };
          });
          return data;
        }
        return [];
      },
      enabled: !!betId,
    }
  );
};
