import { useContext } from "react"
import { TagContext } from "../provider/TagProvider";

export const useTags = () => {
  const tags = useContext(TagContext);

  if (tags === null) throw new Error("UserProviderでラップしてください");

  return tags;
};
