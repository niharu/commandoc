import { useContext } from "react";
import { SelectedTagContext } from "../provider/SelectedTagProvider";

export const useSelectedTags = () => {
  const tag = useContext(SelectedTagContext);

  if (tag === null) throw new Error("SelectedTagProvider でラップしてください");

  return tag;
}