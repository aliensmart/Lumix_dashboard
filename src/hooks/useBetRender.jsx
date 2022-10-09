import { useMemo } from "react";
import { orderBy, query, where } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { colRef } from "../services";

export const useBetRender = (betRef, user, onSuccess, onError) => {
  const betsRef = useMemo(() => {
    if (!betRef?.path) return;
    const ref = query(
      colRef(`${betRef?.path}/usersBets`),
      where("playerRef", "==", user?.ref),
      orderBy("addedOn", "desc")
    );
    return ref;
  }, [betRef, user]);
  return useFirestoreQuery(
    ["singleBetData", betRef?.id],
    betsRef,
    {
      subscribe: false, // or undefined
      source: "cache", // or 'server'
    },
    {
      onSuccess,
      onError,
      select: (doc) => {
        if (doc?.docs?.length >= 1) {
          const data = doc.docs?.map((doc) => {
            return {
              id: doc.id,
              ...doc?.data(),
              userBetRef: doc.ref,
              betId: betRef?.id,
            };
          });
          return data;
        }
        return [];
      },
      enabled: !!betRef?.id,
    }
  );
};
