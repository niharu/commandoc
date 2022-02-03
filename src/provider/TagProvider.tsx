import React, { createContext, useCallback, useEffect, useState } from "react";
import { Tag } from "../components/Tag";
import * as TagAPI from "../api/TagAPI";

export const TagContext = createContext<InitialState | null>(null);

type Props = {
  children: React.ReactNode;
};

type InitialState = {
  tags: Tag[],
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>,
}
export const TagProvider: React.VFC<Props> = ({ children }) => {
  const [tags, setTags] = useState<Tag[]>([]);

  const searchTags = useCallback(() => {
    TagAPI.searchTags().then((resultTags: any) => {
      setTags(Array.from(new Set([...resultTags])));
    });
  }, []);

  useEffect(() => {
    searchTags();
  }, [searchTags]);

  if (tags === null) return <div></div>

  return <TagContext.Provider value={{tags, setTags}}>{children}</TagContext.Provider>
};