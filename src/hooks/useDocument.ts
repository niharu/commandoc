import { useCallback, useContext, useEffect, useState } from "react";
import { Document } from "../components/Document";
import * as DocumentAPI from "../api/DocumentAPI";
import { DocumentContext } from "../provider/DocumentProvider";

export const useDocument = () => {
  const documentContext = useContext(DocumentContext);

  useEffect(() => {
    fetchAllDocuments();
  }, []);

  const fetchAllDocuments = useCallback(() => {
    DocumentAPI.fetchAllDocuments().then((results: Document[]) => {
      if (documentContext !== null) {
        documentContext.setDocuments(results.reverse());
      }
    });
  }, []);

  return documentContext;
};