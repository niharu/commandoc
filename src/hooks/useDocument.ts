import { useCallback, useEffect, useState } from "react";
import { Document } from "../components/Document";
import * as DocumentAPI from "../api/DocumentAPI";

export const useDocument = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    fetchAllDocuments();
  }, []);

  const fetchAllDocuments = useCallback(() => {
    DocumentAPI.fetchAllDocuments().then((results: any) => {
      setDocuments(results);
    });
  }, []);

  return documents;
};