import React, { createContext, useCallback, useEffect, useState } from "react";
import { Document } from "../components/Document";

export const DocumentContext = createContext<InitialState | null>(null);

type Props = {
  children: React.ReactNode;
};

type InitialState = {
  documents: Document[],
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>,
}
export const DocumentProvider: React.VFC<Props> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  return <DocumentContext.Provider value={{documents, setDocuments}}>{children}</DocumentContext.Provider>
};