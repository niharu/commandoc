import { Button } from "@chakra-ui/react";
import firebase from "firebase/compat/app";
import { useLoginUser } from "../hooks/useLoginUser";
import { AddDocument } from "./AddDocument";

export const UserMenu = () => {
  const user = useLoginUser();

  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      <Button onClick={logout}>ログアウト</Button>
      <AddDocument />
    </>
  );
};