import { colRef, docRef } from "../services";
import { orderBy, query, where } from "firebase/firestore";
import {
  useFirestoreDocument,
  useFirestoreDocumentData,
  useFirestoreQuery,
} from "@react-query-firebase/firestore";

export const useSingleUserQuery = (userId, onSuccess, onError) => {
  const ref = docRef(`users/${userId}`);

  return useFirestoreDocumentData(
    ["singleUser", userId],
    ref,
    {
      subscribe: true, // or undefined
      includeMetadataChanges: true,
    },
    {
      onSuccess,
      onError,
      select: (data) => {
        return data;
      },
      enabled: !!userId,
    }
  );
};
