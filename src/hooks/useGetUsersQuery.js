import { colRef } from "../services";
import { orderBy, query, where } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";

export const useGetUsersQuery = () => {
  const ref = query(
    colRef("users"),
    where("isAdmin", "==", false),
    orderBy("lastUpdated", "desc")
  );
  console.log(ref);
  return useFirestoreQuery(
    ["allUsersData"],
    ref,
    {
      subscribe: true, // or undefined
    },
    {
      onSuccess: (s) => {
        console.log(s);
      },
      onError: (err) => {
        console.log(err);
      },
      select: (doc) => {
        console.log(doc);
        if (doc.docs.length >= 1) {
          let data = doc?.docs?.map((dataDoc) => {
            console.log(dataDoc?.data());
            return { ...dataDoc?.data(), id: dataDoc?.id };
          });
          return data;
        }
        return [];
      },
    }
  );
};
