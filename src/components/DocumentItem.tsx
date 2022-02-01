import { Button, Divider, Fade, HStack, PopoverArrow, Textarea, useToast } from "@chakra-ui/react";
import { CopyIcon, EditIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { FormLabel, Stack, StackDivider, Box, Container, Flex, IconButton, Popover, PopoverContent, PopoverTrigger, Spacer, Text, Tooltip } from "@chakra-ui/react";
import { Clip } from "./Clip";
import { GroupBase, OptionBase, CreatableSelect } from "chakra-react-select";
import { Tag } from "./Tag";
import { useContext, useRef, useState } from "react";
import { Tag as TagUi } from "@chakra-ui/react";
import { TagContext } from "../provider/TagProvider";
import { Document } from "./Document";
import * as DocumentAPI from "../api/DocumentAPI";
import * as TagAPI from "../api/TagAPI";
import { useTags } from "../hooks/useTags";
import { useSelectedTags } from "../hooks/useSelectedTag";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react'
import { useLoginUser } from "../hooks/useLoginUser";
import { createDocumentRegistry } from "typescript";

export const DocumentItem: React.FC<{ document: Document }> = ({ document }) => {
  const toast = useToast();
  const user = useLoginUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tags = useTags();
  const selectedTags = useSelectedTags();

  const commandRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null);
  const [command, setCommand] = useState<string>(document.command);
  const [description, setDescription] = useState<string>(document.description);
  const [exists, setExists] = useState<boolean>(true);

  const defaultTags: any[] = document.tags.map((tag) => { return { label: tag, value: tag } });

  // Documentに紐づくタグ
  const [documentTags, setDocumentTags] = useState<Tag[]>(defaultTags);

  // 更新用。新しく登録するタグ
  const [newTagsForUpdate, setNewTagsForUpdate] = useState<Tag[]>([]);

  // 更新用。ドキュメントに紐づくタグ
  const [selectedTagsForUpdate, setSelectedTagsForUpdate] = useState<Tag[]>(defaultTags);

  const handleChangeCategory = (selectedTags: any) => {
    setSelectedTagsForUpdate(selectedTags.map((tag: any) => { return { value: tag.value, label: tag.label }; }));
    setNewTagsForUpdate(selectedTags.filter((tag: any) => tag.__isNew__).map((tag: any) => { return { value: tag.value, label: tag.label }; }));
  };

  const handleClickSave = async () => {
    if (selectedTagsForUpdate.length === 0) {
      alert("タグを1つ以上入力してください")
      return;
    }

    if (commandRef !== null && descriptionRef !== null && commandRef.current !== null && descriptionRef.current !== null) {
      await DocumentAPI.updateDocument({ id: document.id, tags: selectedTagsForUpdate.map((tag: Tag) => tag.value), command: commandRef.current.value, description: descriptionRef.current.value } as Document);
      await TagAPI.addTags(newTagsForUpdate);
      setCommand(commandRef.current.value);
      setDescription(descriptionRef.current.value);
      setDocumentTags(selectedTagsForUpdate);
      onClose();
    }
  }

  const deleteClip = async (id: string) => {
    await DocumentAPI.deleteDocument(id);
  };

  const handleClickDelete = () => {
    setExists(false);
    deleteClip(document.id);
  };

  const copy = () => {
    navigator.clipboard.writeText(document.command);
    toast({
      // title: 'Account created.',
      description: "コマンドをクリップボードにコピーしました",
      status: 'success',
      duration: 3000,
      // isClosable: true,
    })
  }

  const changeTagColor = (tagName: string): string => {
    const selectedTagStr = selectedTags.selectedTags.map((tag) => tag.value);
    if (selectedTagStr.includes(tagName)) {
      return "teal";
    }
    return "gray";
  }

  const replaceItalics = () => {
    const splitWords = command.split(/(\*.+?\*)/);
    let i = 0;
    return (
      <Text fontSize="md">
        {splitWords.map((word) => {
          if (word.startsWith("*") && word.endsWith("*")) {
            return <Text key={i++} fontSize="md" as="i">{word.replaceAll("*", "")}</Text>;
          } else {
            return word
          }
        })}
      </Text>
    );
  }

  const removeNewLine = (e: any) => {
    const str: string = commandRef.current.value;
    commandRef.current.value = str.replace(/\n/g, "");
  }

  return (
    <>
      <Fade in={exists}>
        <Box border="1px" borderColor="gray.400" borderRadius="md" mb="3" p="2" shadow="md">
          <Stack>
            {replaceItalics()}
            {/* <Text fontSize="md" as="samp">{replaceItalics()}</Text> */}
            <Divider borderColor="gray.300" />
            <Text fontSize="md">{description}</Text>
            <HStack>
              {documentTags.map((tag: Tag) => <TagUi key={tag.value} colorScheme={changeTagColor(tag.value)} size="sm">{tag.label}</TagUi>)}
              <Spacer />
              {user !== null && user?.uid === document.createUserId &&
                <Tooltip label={"編集する"}>
                  <IconButton
                    size="xs"
                    icon={<EditIcon />}
                    aria-label="edit"
                    onClick={onOpen}
                    colorScheme="teal"
                  />
                </Tooltip>
              }
              <Tooltip label="copy">
                <IconButton
                  icon={<CopyIcon />}
                  onClick={copy}
                  // onClick={() =>
                  //   toast({
                  //     // title: 'Account created.',
                  //     description: "コマンドをクリップボードにコピーしました",
                  //     status: 'success',
                  //     duration: 3000,
                  //     // isClosable: true,
                  //   })
                  // }
                  size="xs"
                  aria-label="コピー"
                />
              </Tooltip>
              <Modal size="lg" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>コマンドを編集</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Stack>
                      <FormLabel size="lg">Tags</FormLabel>
                      <CreatableSelect
                        options={tags}
                        isMulti
                        onChange={handleChangeCategory}
                        placeholder="タグを入力"
                        defaultValue={defaultTags}
                      />
                      <StackDivider />
                      <FormLabel>Command</FormLabel>
                      <Textarea ref={commandRef} onChange={removeNewLine} defaultValue={document.command} placeholder="コマンドを入力（例: git init *directory*）&#13;&#10;アスタリスク(*)で囲むと斜体になります" />
                      <StackDivider />
                      <FormLabel>Description</FormLabel>
                      <Textarea ref={descriptionRef} defaultValue={document.description} placeholder="コマンドの説明を入力" />
                      <StackDivider />
                      {/* <HStack>
                        <Spacer />
                        <Text fontSize="8px" colorScheme="gray" as="i">author: {user.displayName}</Text>
                      </HStack> */}
                      <HStack>
                        <Spacer />
                        <Button w="200px" colorScheme="teal" onClick={handleClickSave}>保存</Button>
                        <Spacer />
                        <Button w="200px" colorScheme="red" onClick={handleClickDelete}>削除</Button>
                        <Spacer />
                      </HStack>
                    </Stack>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </HStack>
          </Stack>
        </Box>
      </Fade>
    </>
  );
};