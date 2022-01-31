import { useContext } from "react";
import { UserContext } from "../provider/UserProvider";
import firebase from "firebase/compat/app";

export function useLoginUser(): firebase.User | null {
  const user = useContext(UserContext);

  // if (user === null || user.user === null) throw new Error("UserProviderでラップしてください");

  return user!.user;
}