import { Button, HStack, Textarea } from "@chakra-ui/react";
import { FormLabel, Stack, StackDivider, Spacer } from "@chakra-ui/react";
import { CreatableSelect } from "chakra-react-select";
import { Tag } from "./Tag";
import React, { useRef, useState } from "react";
import { Document } from "./Document";
import * as DocumentAPI from "../api/DocumentAPI";
import * as TagAPI from "../api/TagAPI";
import { useTags } from "../hooks/useTags";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  document: Document;
  setCommand: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setExists: React.Dispatch<React.SetStateAction<boolean>>;
  setDocumentTags: React.Dispatch<React.SetStateAction<Tag[]>>;
};
export const CommandEditModal: React.FC<Props> = (props) => {
  const commandRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null);

  const tags = useTags();

  const defaultTags: any[] = props.document.tags.map((tag) => {
    return { label: tag, value: tag };
  });

  // 更新用。新しく登録するタグ
  const [newTagsForUpdate, setNewTagsForUpdate] = useState<Tag[]>([]);

  // 更新用。ドキュメントに紐づくタグ
  const [selectedTagsForUpdate, setSelectedTagsForUpdate] =
    useState<Tag[]>(defaultTags);

  const removeNewLine = (e: any) => {
    const str: string = commandRef.current.value;
    commandRef.current.value = str.replace(/\n/g, "");
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
  };

  const handleClickSave = async () => {
    if (selectedTagsForUpdate.length === 0) {
      alert("タグを1つ以上入力してください");
      return;
    }

    if (
      commandRef !== null &&
      descriptionRef !== null &&
      commandRef.current !== null &&
      descriptionRef.current !== null
    ) {
      await DocumentAPI.updateDocument({
        id: props.document.id,
        tags: selectedTagsForUpdate.map((tag: Tag) => tag.value),
        command: commandRef.current.value,
        description: descriptionRef.current.value,
      } as Document);
      await TagAPI.addTags(newTagsForUpdate);
      props.setCommand(commandRef.current.value);
      props.setDescription(descriptionRef.current.value);
      props.setDocumentTags(selectedTagsForUpdate);
      props.onClose();
    }
  };

  const deleteClip = async (id: string) => {
    await DocumentAPI.deleteDocument(id);
  };

  const handleClickDelete = () => {
    props.setExists(false);
    deleteClip(props.document.id);
  };

  return (
    <Modal size="lg" isOpen={props.isOpen} onClose={props.onClose}>
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
              onChange={removeNewLine}
              defaultValue={props.document.command}
              placeholder="コマンドを入力（例: git init *directory*）&#13;&#10;アスタリスク(*)で囲むと斜体になります"
            />
            <StackDivider />
            <FormLabel>Description</FormLabel>
            <Textarea
              ref={descriptionRef}
              defaultValue={props.document.description}
              placeholder="コマンドの説明を入力"
            />
            <StackDivider />
            <HStack>
              <Spacer />
              <Button w="200px" colorScheme="teal" onClick={handleClickSave}>
                保存
              </Button>
              <Spacer />
              <Button w="200px" colorScheme="red" onClick={handleClickDelete}>
                削除
              </Button>
              <Spacer />
            </HStack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
