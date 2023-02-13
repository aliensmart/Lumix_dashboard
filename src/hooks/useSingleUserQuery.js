import { docRef } from "../services";
import { useFirestoreDocumentData } from "@react-query-firebase/firestore";

export const useSingleUserQuery = (userId, onSuccess, onError) => {
  const ref = docRef(`users/${userId}`);

  return useFirestoreDocumentData(
    ["singleUser", userId],
    ref,
    {
      subscribe: true, // or undefined
      includeMetadataChanges: true,
      source: "cache",
    },
    {
      onSuccess,
      onError,
      select: (data) => {
        return {
          ...data,
          ref: ref,
          fullName: `${data?.firstName} ${data?.lastName}`,
        };
      },
      enabled: !!userId,
    }
  );
};
