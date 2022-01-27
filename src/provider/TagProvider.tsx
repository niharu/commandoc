import React, { createContext, useCallback, useEffect, useState } from "react";
import { Tag } from "../components/Tag";
import * as TagAPI from "../api/TagAPI";

export const TagContext = createContext<Tag[] | null>(null);

type Props = {
  children: React.ReactNode;
};

export const TagProvider: React.VFC<Props> = ({ children }) => {
  const [tags, setTags] = useState<Tag[] | null>(null);

  const searchTags = useCallback(() => {
    TagAPI.searchTags().then((resultTags: any) => {
      setTags([...resultTags]);
    });
  }, []);

  useEffect(() => {
    searchTags();
  }, [searchTags]);

  if (tags === null) return <div></div>

  return <TagContext.Provider value={tags}>{children}</TagContext.Provider>
};