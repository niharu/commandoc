import React, { createContext, useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { Login } from "../components/Login";

export const UserContext = createContext<InitialState | null>(null);

type Props = {
  children: React.ReactNode;
};

type InitialState = {
  user: firebase.User | null,
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
}
export const UserProvider: React.VFC<Props> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [ loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(firebaseUser => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unregisterAuthObserver();
  }, []);

  // if (user === null) return <Login/>;

  return <UserContext.Provider value={{user, loading, setLoading}}>{children}</UserContext.Provider>
};