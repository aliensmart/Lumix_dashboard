import { auth } from "../services";
import { useAuthUser } from "@react-query-firebase/auth";

export const useAuthQuery = () => {
  return useAuthUser(["user"], auth, {
    onSuccess(user) {
      if (user) {
        console.log("User is authenticated!", user.uid);
      }
    },
    onError(error) {
      console.log(error);
      console.error("Failed to subscribe to users authentication state!");
    },
    select: (user) => {
      console.log(user);
      if (user?.uid) {
        return {
          uid: user?.uid,
          phoneNumber: user?.phoneNumber,
        };
      }
      return null;
    },
  });
};
