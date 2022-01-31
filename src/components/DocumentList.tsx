import { Container, List, Text, Alert, AlertIcon ,Fade} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDocument } from "../hooks/useDocument";
import { useFilterWord } from "../hooks/useFilterWord";
import { useSelectedTags } from "../hooks/useSelectedTag";
import { Document } from "./Document";
import { DocumentItem } from "./DocumentItem";
import Fuse from 'fuse.js';
import { useLoginUser } from "../hooks/useLoginUser";
import { useSettings } from "../hooks/useSetings";

export const DocumentList = () => {
  const documents = useDocument();
  const selectedTags = useSelectedTags();
  const filterWord = useFilterWord();
  const user = useLoginUser();
  const settings = useSettings();

  const [filteredDocuments, setFilteredDocuments] = useState(documents);

  useEffect(() => {
    let filteredDocumentTmp = documents;

    if (user !== null && settings.filterMyCommand) {
      filteredDocumentTmp = filteredDocumentTmp.filter((document: Document) => user.uid === document.createUserId);
    }

    if (selectedTags?.selectedTags?.length > 0) {
      const strTags: string[] = selectedTags.selectedTags.map((tag) => tag.value);
      filteredDocumentTmp = filteredDocumentTmp.filter((document: Document) => document.tags.some((tag) => strTags.includes(tag)));
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
  }, [selectedTags, filterWord, documents, settings.filterMyCommand]);

  return (
    <>
      {filteredDocuments.length !== 0 ? (
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
      )
        :
        <>
          {/* <Text>コマンドが見つかりませんでした</Text> */}
          {/* <Fade in={true}>
            <Alert status='warning'>
              <AlertIcon />
              該当するコマンドがありませんでした。
            </Alert>
          </Fade> */}
        </>

      }
    </>
  );
};