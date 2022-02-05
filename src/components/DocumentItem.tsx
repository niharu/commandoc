import {
  chakra,
  Divider,
  Fade,
  HStack,
  useToast,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { CopyIcon, EditIcon } from "@chakra-ui/icons";
import {
  Stack,
  Box,
  IconButton,
  Spacer,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Tag } from "./Tag";
import React, { useState } from "react";
import { Tag as TagUi } from "@chakra-ui/react";
import { Document } from "./Document";
import { useSelectedTags } from "../hooks/useSelectedTag";
import { useDisclosure } from "@chakra-ui/react";
import { useLoginUser } from "../hooks/useLoginUser";
import { useClickable } from "@chakra-ui/clickable";
import { UpdateArticle } from "./UpdateArticle";

export const DocumentItem: React.FC<{ document: Document }> = ({
  document,
}) => {
  const toast = useToast();
  const user = useLoginUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectedTags = useSelectedTags();

  const [command, setCommand] = useState<string>(document.command);
  const [description, setDescription] = useState<string>(document.description);
  const [exists, setExists] = useState<boolean>(true);

  const defaultTags: any[] = document.tags.map((tag) => {
    return { label: tag, value: tag };
  });

  // Documentに紐づくタグ
  const [documentTags, setDocumentTags] = useState<Tag[]>(defaultTags);

  const Clickable = (props: any) => {
    const clickable = useClickable(props);
    return <chakra.button display="inline-flex" {...clickable} />;
  };

  const copy = () => {
    navigator.clipboard.writeText(document.command);
    toast({
      description: "コマンドをクリップボードにコピーしました",
      status: "success",
      duration: 3000,
    });
  };

  const changeTagColor = (tagName: string): string => {
    const selectedTagStr = selectedTags.selectedTags;
    if (selectedTagStr.includes(tagName)) {
      return "teal";
    }
    return "gray";
  };

  const replaceItalics = () => {
    const splitWords = command.split(/(\*.+?\*)/);
    let i = 0;
    return (
      <Text fontSize="md" as="samp">
        {splitWords.map((word) => {
          if (word.startsWith("*") && word.endsWith("*")) {
            return (
              <Text key={i++} fontSize="md" as="i">
                {word.replaceAll("*", "")}
              </Text>
            );
          } else {
            return word;
          }
        })}
      </Text>
    );
  };

  return (
    <>
      {exists && (
        <Fade in={true}>
          <Box
            border="1px"
            borderColor="gray.400"
            borderRadius="md"
            mb="3"
            p="2"
            shadow="md"
          >
            <Stack>
              <HStack>
                <Wrap>{replaceItalics()}</Wrap>
                <Spacer />
                <Tooltip label="copy">
                  <IconButton
                    icon={<CopyIcon />}
                    onClick={copy}
                    size="xs"
                    aria-label="コピー"
                  />
                </Tooltip>
              </HStack>
              <Divider borderColor="gray.300" />
              <HStack>
                <Wrap>
                  <Text fontSize="md">{description}</Text>
                </Wrap>
              </HStack>
              <HStack>
                <Wrap>
                  {documentTags.map((tag: Tag) => (
                    <WrapItem key={tag.value}>
                      <Clickable
                        as="div"
                        _disabled={{ opacity: 0.4, pointerEvents: "none" }}
                        borderRadius="md"
                        key={tag.value}
                      >
                        <TagUi
                          _hover={{ opacity: 0.6 }}
                          colorScheme={changeTagColor(tag.value)}
                          size="sm"
                        >
                          {tag.label}
                        </TagUi>
                      </Clickable>
                    </WrapItem>
                  ))}
                </Wrap>
                <Spacer />
                {user !== null && user?.uid === document.createUserId && (
                  <Tooltip label={"編集する"}>
                    <IconButton
                      size="xs"
                      icon={<EditIcon />}
                      aria-label="edit"
                      onClick={onOpen}
                      colorScheme="teal"
                    />
                  </Tooltip>
                )}
              </HStack>
            </Stack>
          </Box>
          <UpdateArticle
            isOpen={isOpen}
            document={document}
            onClose={onClose}
            setCommand={setCommand}
            setDescription={setDescription}
            setExists={setExists}
            setDocumentTags={setDocumentTags}
          />
        </Fade>
      )}
    </>
  );
};
