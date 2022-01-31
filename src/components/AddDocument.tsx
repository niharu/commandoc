import { Button, FormLabel, Stack, StackDivider, Text, Textarea, useDisclosure } from "@chakra-ui/react";

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { useContext, useRef, useState } from "react";

import React from 'react';
import { MultiValue } from "chakra-react-select";
import { GroupBase, OptionBase, CreatableSelect } from "chakra-react-select";
import { Tag } from "./Tag";
import { Document } from "./Document";
import { TagContext } from "../provider/TagProvider";
import * as DocumentAPI from "../api/DocumentAPI";
import * as TagAPI from "../api/TagAPI";
import { useTags } from "../hooks/useTags";
import { ulid } from "ulid";
import { useLoginUser } from "../hooks/useLoginUser";

export const AddDocument = () => {
  const user = useLoginUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const tags = useTags();

  const commandRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null);

  // 更新用。新しく登録するタグ
  const [newTagsForUpdate, setNewTagsForUpdate] = useState<Tag[]>([]);

  // 更新用。ドキュメントに紐づくタグ
  const [selectedTagsForUpdate, setSelectedTagsForUpdate] = useState<Tag[]>([]);

  const handleChangeCategory = (selectedTags: MultiValue<Tag>) => {
    setSelectedTagsForUpdate(selectedTags.map((tag: any) => { return { value: tag.value, label: tag.label }; }));
    setNewTagsForUpdate(selectedTags.filter((tag: any) => tag.__isNew__).map((tag: any) => { return { value: tag.value, label: tag.label }; }));
  };

  const handleClickSave = async () => {
    if (user !== null && commandRef !== null && descriptionRef !== null && commandRef.current !== null && descriptionRef.current !== null) {
      const newDocument: Document = {
        id: ulid(),
        tags: selectedTagsForUpdate.map((tag: Tag) => tag.value),
        command: commandRef.current.value,
        description: descriptionRef.current.value,
        createUserId: user.uid,
        createUserName: user.displayName ? user.displayName : ""
      };

      await DocumentAPI.addDocument(newDocument);
      await TagAPI.addTags(newTagsForUpdate);
      commandRef.current.value = "";
      descriptionRef.current.value = "";
      onClose();
    }
  }

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>Add new</Button>
      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>コマンドを投稿</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <FormLabel size="lg">Tags</FormLabel>
              <CreatableSelect
                options={tags}
                isMulti
                onChange={handleChangeCategory}
                placeholder="タグを入力"
              />
              <StackDivider />
              <FormLabel>Command</FormLabel>
              <Textarea
                ref={commandRef}
                placeholder="コマンドを入力&#13;&#10;アスタリスク(*)で囲むと斜体になります"
              />
              <StackDivider />
              <FormLabel>Description</FormLabel>
              <Textarea ref={descriptionRef} placeholder="コマンドの説明を入力" />
              <StackDivider />
              <Button colorScheme="teal" onClick={handleClickSave}>投稿する</Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};