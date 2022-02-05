import { Button, HStack, Textarea } from "@chakra-ui/react";
import { FormLabel, Stack, StackDivider, Spacer } from "@chakra-ui/react";
import { CreatableSelect } from "chakra-react-select";
import { Tag } from "./Tag";
import React, { useRef, useState } from "react";
import { Document } from "./Document";
import { useTags } from "../hooks/useTags";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { DeleteArticle } from "./DeleteArticle";
import { updateArticle } from "../api/updateArticle";
import { createTags } from "../api/createTags";

type UpdateArticleProps = {
  isOpen: boolean;
  onClose: () => void;
  document: Document;
  setCommand: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setExists: React.Dispatch<React.SetStateAction<boolean>>;
  setDocumentTags: React.Dispatch<React.SetStateAction<Tag[]>>;
};
export const UpdateArticle = ({
  isOpen,
  onClose,
  document,
  setCommand,
  setDescription,
  setDocumentTags,
  setExists,
}: UpdateArticleProps) => {
  const commandRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null);
  const tags = useTags();
  const [canSave, setCanSave] = useState<boolean>(false);
  const defaultTags: any[] = document.tags.map((tag) => {
    return { label: tag, value: tag };
  });

  // 更新用。新しく登録するタグ
  const [newTagsForUpdate, setNewTagsForUpdate] = useState<Tag[]>([]);

  // 更新用。ドキュメントに紐づくタグ
  const [selectedTagsForUpdate, setSelectedTagsForUpdate] =
    useState<Tag[]>(defaultTags);

  const handleChangeCommand = () => {
    // 改行を入力できないようにする
    commandRef.current.value = commandRef.current.value.replace(/\n/g, "");

    setCanSave(commandRef.current.value);
  };

  const handleChangeDescription = () => {
    setCanSave(descriptionRef.current.value);
  };

  const handleChangeCategory = (selectedTags: any) => {
    setSelectedTagsForUpdate(
      selectedTags.map((tag: any) => {
        return { value: tag.value, label: tag.label };
      })
    );
    setNewTagsForUpdate(
      selectedTags
        .filter((tag: any) => tag.__isNew__)
        .map((tag: any) => {
          return { value: tag.value, label: tag.label };
        })
    );

    setCanSave(selectedTags.length > 0);
  };

  const handleClickSave = async () => {
    updateArticle({
      id: document.id,
      tags: selectedTagsForUpdate.map((tag: Tag) => tag.value),
      command: commandRef.current.value,
      description: descriptionRef.current.value,
    } as Document);
    createTags(newTagsForUpdate);
    setCommand(commandRef.current.value);
    setDescription(descriptionRef.current.value);
    setDocumentTags(selectedTagsForUpdate);
    onClose();
  };

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>コマンドを編集</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <FormLabel size="lg">Tags</FormLabel>
            <CreatableSelect
              options={tags.tags}
              isMulti
              onChange={handleChangeCategory}
              placeholder="タグを入力"
              defaultValue={defaultTags}
            />
            <StackDivider />
            <FormLabel>Command</FormLabel>
            <Textarea
              ref={commandRef}
              onChange={handleChangeCommand}
              defaultValue={document.command}
              placeholder="コマンドを入力（例: git init *directory*）&#13;&#10;アスタリスク(*)で囲むと斜体になります"
            />
            <StackDivider />
            <FormLabel>Description</FormLabel>
            <Textarea
              ref={descriptionRef}
              onChange={handleChangeDescription}
              defaultValue={document.description}
              placeholder="コマンドの説明を入力"
            />
            <StackDivider />
            <HStack>
              <Spacer />
              <Button
                w="200px"
                colorScheme="teal"
                isDisabled={!canSave}
                onClick={handleClickSave}
              >
                保存
              </Button>
              <Spacer />
              <DeleteArticle id={document.id} setExists={setExists} />
              <Spacer />
            </HStack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
