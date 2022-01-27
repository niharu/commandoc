import { Button } from "@chakra-ui/react";
import firebase from "firebase/compat/app";
import { useLoginUser } from "../hooks/useLoginUser";

export const UserMenu = () => {
  const user = useLoginUser();

  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      <Button onClick={logout}>ログアウト</Button>
    </>
  );
};