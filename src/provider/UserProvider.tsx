import React, { createContext, useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { Login } from "../components/Login";

export const UserContext = createContext<firebase.User | null>(null);

type Props = {
  children: React.ReactNode;
};

export const UserProvider: React.VFC<Props> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(firebaseUser => {
      setUser(firebaseUser);
    });
    return () => unregisterAuthObserver();
  }, []);

  if (user === null) return <Login/>;

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
};