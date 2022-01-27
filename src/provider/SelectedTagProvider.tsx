import React, { createContext, useCallback, useEffect, useState } from "react";
import { Tag } from "../components/Tag";

export const SelectedTagContext = createContext<InitialState | null>(null);

type Props = {
  children: React.ReactNode;
};

type InitialState = {
  selectedTags: Tag[],
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>,
}
export const SelectedTagProvider: React.VFC<Props> = ({ children }) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  return <SelectedTagContext.Provider value={{selectedTags, setSelectedTags}}>{children}</SelectedTagContext.Provider>
};
