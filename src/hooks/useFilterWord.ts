import { useContext } from "react";
import { FilterWordContext } from "../provider/FilterWordProvider";

export const useFilterWord = () => {
  const filter = useContext(FilterWordContext);

  if (filter === null)
    throw new Error("FilterWordProvider でラップしてください");

  return filter;
};
