import { colRef } from "../services";
import { query } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";

export const useRolesQUery = (onSuccess, onError) => {
  const ref = query(colRef(`adminStatus`));

  return useFirestoreQuery(
    ["roles"],
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
          let data = {};
          doc?.docs?.forEach((dataDoc) => {
            data[dataDoc?.id] = { ...dataDoc?.data(), ref: dataDoc?.ref };
          });
          return data;
        }
        return {};
      },
    }
  );
};
