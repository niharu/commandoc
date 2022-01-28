import { Button, Divider, HStack, PopoverArrow, Textarea } from "@chakra-ui/react";
import { CopyIcon, EditIcon } from "@chakra-ui/icons";
import { FormLabel, Stack, StackDivider, Box, Container, Flex, IconButton, Popover, PopoverContent, PopoverTrigger, Spacer, Text, Tooltip } from "@chakra-ui/react";
import { Clip } from "./Clip";
import CreatableSelect from 'react-select/creatable';
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

export const DocumentItem: React.FC<{ document: Document }> = ({ document }) => {
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
      <Text fontSize="md" as="samp">
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

  return (
    <>
      {exists &&
        <Box border="1px" borderColor="gray.400" borderRadius="md" mb="3" p="2">
          <Stack>
            {replaceItalics()}
            {/* <Text fontSize="md" as="samp">{replaceItalics()}</Text> */}
            <Divider borderColor="gray.300" />
            <Text fontSize="md">{description}</Text>
            <HStack>
              {documentTags.map((tag: Tag) => <TagUi key={tag.value} colorScheme={changeTagColor(tag.value)} size="sm">{tag.label}</TagUi>)}
              <Spacer />
              <Tooltip label="copy">
                <IconButton
                  icon={<CopyIcon />}
                  onClick={copy}
                  size="xs"
                  aria-label="コピー"
                />
              </Tooltip>
              {/* <Popover placement="right">
                <PopoverTrigger>
                  <IconButton
                    size="xs"
                    icon={<EditIcon />}
                    aria-label="edit"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <Text>Tags</Text>
                  <CreatableSelect
                    isMulti
                    onChange={handleChangeCategory}
                    options={tags}
                    defaultValue={defaultTags}
                  />
                  <Text>Command</Text>
                  <Textarea ref={commandRef} defaultValue={document.command} />
                  <Text>Description</Text>
                  <Textarea ref={descriptionRef} defaultValue={document.description} />
                  <Flex>
                    <Button onClick={handleClickSave}>Save</Button>
                    <Spacer />
                    <Button onClick={handleClickDelete}>Delete</Button>
                  </Flex>
                </PopoverContent>
              </Popover> */}
              <IconButton
                size="xs"
                icon={<EditIcon />}
                aria-label="edit"
                onClick={onOpen}
              />
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
                        placeholder="タグを5つまで入力"
                        defaultValue={defaultTags}
                      />
                      <StackDivider />
                      <FormLabel>Command</FormLabel>
                      <Textarea ref={commandRef} defaultValue={document.command} placeholder="コマンドを入力&#13;&#10;アスタリスク(*)で囲むと斜体になります" />
                      <StackDivider />
                      <FormLabel>Description</FormLabel>
                      <Textarea ref={descriptionRef} defaultValue={document.description} placeholder="コマンドの説明を入力" />
                      <StackDivider />
                      <HStack>
                        <Spacer/>
                        <Button colorScheme="teal" onClick={handleClickSave}>Save</Button>
                        <Spacer/>
                        <Button colorScheme="red" onClick={handleClickDelete}>Delete</Button>
                        <Spacer/>
                      </HStack>
                    </Stack>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </HStack>
          </Stack>
        </Box>
      }
    </>
  );
};