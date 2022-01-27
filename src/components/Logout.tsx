import { Button } from "@chakra-ui/react";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "../config/config"
import 'firebase/compat/auth';

import { useContext } from "react";
import { useLoginUser } from "../hooks/useLoginUser";

firebase.initializeApp(firebaseConfig);

export const Logout = () => {
  const user = useLoginUser();

  const logout = () => {
    firebase.auth().signOut();
  }

  return (
    <div>
      {user === null ?
        <>ローディング中...</> :
        <Button colorScheme="blue" onClick={logout}>ログアウト</Button>
      }
    </div>
  );
}
