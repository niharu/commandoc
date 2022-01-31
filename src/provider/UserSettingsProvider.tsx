import React, { createContext, useCallback, useEffect, useState } from "react";

export const UserSettingsContext = createContext<InitialState | null>(null);

type Props = {
  children: React.ReactNode;
};

type InitialState = {
  filterMyCommand: boolean,
  setfilterMyCommand: React.Dispatch<React.SetStateAction<boolean>>,
}
export const UserSettingsProvider: React.VFC<Props> = ({ children }) => {
  const [filterMyCommand, setfilterMyCommand] = useState<boolean>(false);

  return <UserSettingsContext.Provider value={{filterMyCommand, setfilterMyCommand}}>{children}</UserSettingsContext.Provider>
};
