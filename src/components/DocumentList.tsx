import { Container, List, Text, Alert, AlertIcon, Fade, Center, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDocument } from "../hooks/useDocument";
import { useFilterWord } from "../hooks/useFilterWord";
import { useSelectedTags } from "../hooks/useSelectedTag";
import { Document } from "./Document";
import { DocumentItem } from "./DocumentItem";
import Fuse from 'fuse.js';
import { useLoginUser } from "../hooks/useLoginUser";
import { useSettings } from "../hooks/useSetings";
import { useClickable } from "@chakra-ui/clickable";

export const DocumentList = () => {
  const documents = useDocument();
  const selectedTags = useSelectedTags();
  const filterWord = useFilterWord();
  const user = useLoginUser();
  const settings = useSettings();

  const [filteredDocuments, setFilteredDocuments] = useState(documents?.documents);

  useEffect(() => {
    let filteredDocumentTmp = documents?.documents;

    if (filteredDocumentTmp === null || filteredDocumentTmp === undefined) {
      return;
    }

    if (user !== null && settings.filterMyCommand) {
      filteredDocumentTmp = filteredDocumentTmp.filter((document: Document) => user.uid === document.createUserId);
    }

    if (selectedTags?.selectedTags?.length > 0) {
      const strTags: string[] = selectedTags.selectedTags;
      filteredDocumentTmp = filteredDocumentTmp.filter((document: Document) => document.tags.some((tag) => strTags.includes(tag)));
    }

    if (filterWord?.filterWord && filterWord.filterWord.length >= 2) {

      const options = {
        threshold: 0.3,
        useExtendedSearch: true,
        keys: [
          "command",
          "description",
          "tags",
        ]
      };

      // あいまい検索
      const fuse = new Fuse(filteredDocumentTmp, options);
      const results = fuse.search(filterWord.filterWord);

      filteredDocumentTmp = results.map((result: any) => result.item);
    }
    setFilteredDocuments(filteredDocumentTmp);
  }, [selectedTags, filterWord, documents, settings.filterMyCommand, user]);

  return (
    <>
      {filteredDocuments?.length !== 0 ? (
        <>
          <List>
            {filteredDocuments?.map((document: Document) => (
              <DocumentItem
                key={document.id}
                document={document}
              />
            ))}
          </List>
        </>
      )
        :
        <></>
        // (settings.filterMyCommand &&
        //   <>
        //     <Fade in={true}>
        //       <Alert mb="2" mt="2" status='warning'>
        //         <AlertIcon />
        //         「自分が投稿したコマンドのみ表示」が有効になっています。
        //       </Alert>
        //     </Fade>
        //   </>
        // )
      }
    </>
  );
};