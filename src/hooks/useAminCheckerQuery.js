import { getDoc, query } from "firebase/firestore";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { docRef } from "../services";
import { useAuthQuery } from "./useAuthQuery";

export const useAdminCheckerQuery = (onSuccess, onError) => {
  const { data } = useAuthQuery();

  const getAdminData = () => {
    return getDoc(docRef(`admins/${data?.uid}`));
  };

  return useQuery(["currentAdmin", data?.uid], getAdminData, {
    onSuccess,
    onError,
    enabled: !!data?.uid,
    select: (doc) => {
      if (doc.exists()) {
        return { ref: doc.ref, ...doc.data() };
      }
      return null;
    },
  });
};
