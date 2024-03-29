import { useFirestoreDocumentData } from "@react-query-firebase/firestore";
import { docRef } from "../services";

export const useCurrentAdmin = (userId, onSuccess, onError) => {
  const ref = docRef(`admins/${userId}`);

  return useFirestoreDocumentData(
    ["currentAdmin", userId],
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
        return {
          ...doc?.data(),
          fullName: `${doc?.data()?.firstName} ${doc?.data()?.lastName}`,
        };
      },
      enabled: !!userId,
    }
  );
};
