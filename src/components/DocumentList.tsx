import { Container, List } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDocument } from "../hooks/useDocument";
import { useFilterWord } from "../hooks/useFilterWord";
import { useSelectedTags } from "../hooks/useSelectedTag";
import { Document } from "./Document";
import { DocumentItem } from "./DocumentItem";
import Fuse from 'fuse.js';

export const DocumentList = () => {
  const documents = useDocument();
  const selectedTags = useSelectedTags();
  const filterWord = useFilterWord();

  const [filteredDocuments, setFilteredDocuments] = useState(documents);

  useEffect(() => {
    let filteredDocumentTmp = documents;

    if (selectedTags?.selectedTags?.length > 0) {
      const strTags: string[] = selectedTags.selectedTags.map((tag) => tag.value);
      filteredDocumentTmp = documents.filter((document: Document) => document.tags.some((tag) => strTags.includes(tag)));
    }

    if (filterWord?.filterWord && filterWord?.filterWord.length >= 2) {

      const options = {
        threshold: 0.3,
        keys: [
          "command",
          "description",
          "tags"
        ]
      };

      // あいまい検索
      const fuse = new Fuse(filteredDocumentTmp, options);
      const results = fuse.search(filterWord.filterWord);

      filteredDocumentTmp = results.map((result: any) => result.item);
    }
    setFilteredDocuments(filteredDocumentTmp);
  }, [selectedTags, filterWord, documents]);

  return (
    <>
      {filteredDocuments.length !== 0 && (
        <>
          <List>
            {filteredDocuments.map((document: Document) => (
              <DocumentItem
                key={document.id}
                document={document}
              />
            ))}
          </List>
        </>
      )}
    </>
  );
};