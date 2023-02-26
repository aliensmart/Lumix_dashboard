import { getDoc, query } from "firebase/firestore";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { ADMINS_PATH } from "../constants";
import { docRef } from "../services";
import { useAuthQuery } from "./useAuthQuery";

export const useAdminCheckerQuery = (onSuccess, onError) => {
  const { data } = useAuthQuery();

  const getAdminData = () => {
    return getDoc(docRef(`users/${data?.uid}`));
  };

  return useQuery(["currentAdmin", data?.uid], getAdminData, {
    onSuccess,
    onError,
    enabled: !!data?.uid,
    select: (doc) => {
      if (doc.exists()) {
        const isAdmin = ADMINS_PATH.includes(doc.data().role.path);
        console.log("isAdmin", isAdmin);
        console.log("role", doc.data().role.path);
        if (isAdmin) {
          return { ref: doc.ref, ...doc.data() };
        }
      }
      return null;
    },
  });
};
