import { Center, Container, Text, Heading, Stack, Divider, Box, List } from "@chakra-ui/react";
import { Title } from "./Title";

import { Button, Fade, HStack, PopoverArrow, Textarea, useToast } from "@chakra-ui/react";
import { CopyIcon, EditIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { FormLabel, StackDivider, Flex, IconButton, Popover, PopoverContent, PopoverTrigger, Spacer, Tooltip } from "@chakra-ui/react";
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
import { Link } from "react-router-dom";
import { GoMarkGithub } from "react-icons/go";

export const About = () => {
  const documents = [
    {
      command: "commandocとは",
      descriptino: "コマンドを共有するサービスです。",
      tags: [],
      user: null,
      iconDisplay: false,
    },
    {
      command: "ここにコマンドが表示されます。",
      descriptino: "ここに説明が表示されます。",
      tags: [],
      user: null,
      iconDisplay: false,
    },
    {
      command: "アイコン",
      descriptino: "Infoアイコンにカーソルを合わせると、作成者（GitHubの表示名）が表示されます。\r\nCopyアイコンで、クリップボードにコピーができます。",
      tags: [],
      user: null,
      iconDisplay: true,
    },
    {
      command: "タグ",
      descriptino: "コマンドを投稿するときにタグを指定できます。\r\n↓こんな感じで表示されます。",
      tags: ["Linux"],
      user: null,
      iconDisplay: false,
    },
    {
      command: "ログイン",
      descriptino: "GitHubアカウントでログインできます。",
      tags: [],
      user: null,
      iconDisplay: false,
    },
    {
      command: "コマンドの投稿",
      descriptino: "ログインすると、右上の「Add new」でコマンドが投稿できます。",
      tags: ["ログイン時のみ"],
      user: null,
      iconDisplay: false,
    },
    {
      command: "コマンドの編集",
      descriptino: "自分が投稿したコマンドは、右下のInfoアイコンがEditアイコンに変わります。\r\nクリックすると編集画面が開きます。",
      tags: ["ログイン時のみ"],
      user: "niharu",
      iconDisplay: true,
    },
    {
      command: "自分が投稿したコマンドのみ表示",
      descriptino: "右上のメニューで、自分が投稿したコマンドのみ表示することができます。",
      tags: ["ログイン時のみ"],
      user: null,
      iconDisplay: false,
    },
    {
      command: "カラーモード",
      descriptino: "右上のメニューで、ライトかダークを選べます。",
      tags: [],
      user: null,
      iconDisplay: false,
    },
  ];
  return (
    <>
      <Stack>
        <Heading size="lg">About & 使い方</Heading>
        <List>
          {documents.map((document) => (
            <Box key={document.command} border="1px" borderColor="gray.400" borderRadius="md" mb="3" p="2" shadow="md">
              <Stack>
                <Text fontSize="md">{document.command}</Text>
                <Divider borderColor="gray.300" />
                <Text fontSize="md">{document.descriptino}</Text>
                <HStack>
                  {document.tags.map((tag: string) => <TagUi key={tag} size="sm">{tag}</TagUi>)}
                  <Spacer />
                  {document.iconDisplay &&
                    <>
                      {document.user !== null ?
                        <Tooltip label={"ここでは編集画面は開きません"}>
                          <IconButton
                            size="xs"
                            icon={<EditIcon />}
                            aria-label="edit"
                            colorScheme="teal"
                          />
                        </Tooltip>
                        :
                        <Tooltip label="author: niharu">
                          <IconButton
                            size="xs"
                            icon={<InfoOutlineIcon />}
                            aria-label="edit"
                          />
                        </Tooltip>
                      }
                      <Tooltip label="copy">
                        <IconButton
                          icon={<CopyIcon />}
                          size="xs"
                          aria-label="ここをクリックすると、クリップボードにコピーされます。"
                        />
                      </Tooltip>
                    </>
                  }
                </HStack>
              </Stack>
            </Box>
          ))}
        </List>
        <Center>
          <Link to="/"><Text as="u">Home</Text></Link>
        </Center>
        <Center>
          <Text fontSize="xs">Created by niharu</Text>
          <GoMarkGithub />
        </Center>
      </Stack>
    </>
  );
};