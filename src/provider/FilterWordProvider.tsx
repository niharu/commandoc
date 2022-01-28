import React, { createContext, useCallback, useEffect, useState } from "react";

export const FilterWordContext = createContext<InitialState | null>(null);

type Props = {
  children: React.ReactNode;
};

type InitialState = {
  filterWord: string,
  setFilterWord: React.Dispatch<React.SetStateAction<string>>,
}
export const FilterWordProvider: React.VFC<Props> = ({ children }) => {
  const [filterWord, setFilterWord] = useState<string>("");

  return <FilterWordContext.Provider value={{filterWord, setFilterWord}}>{children}</FilterWordContext.Provider>
};
