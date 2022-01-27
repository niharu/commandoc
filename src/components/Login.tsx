import { Button } from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react"
import { SignInScreen } from "./SignInScreen";

import firebase from "firebase/compat/app";
import { firebaseConfig } from "../config/config"
import 'firebase/compat/auth';

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: "/",
  signInOptions: [
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
}

firebase.initializeApp(firebaseConfig);

export const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <>
        <Button colorScheme="blue" onClick={onOpen}>ログイン</Button>
        <SignInScreen isOpen={isOpen} onClose={onClose} uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </>
    </div>
  );
}