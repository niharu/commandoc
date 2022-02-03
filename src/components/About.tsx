import {
  Center,
  Text,
  Heading,
  Stack,
  Divider,
  Box,
  List,
  Link as ChakraLink,
} from "@chakra-ui/react";

import { HStack } from "@chakra-ui/react";
import { CopyIcon, EditIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { IconButton, Spacer, Tooltip } from "@chakra-ui/react";
import { Tag as TagUi } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";

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
      command: "コマンドと",
      descriptino: "説明が表示されます。",
      tags: [],
      user: null,
      iconDisplay: false,
    },
    {
      command: "タグ",
      descriptino:
        "コマンドを投稿するときにタグを指定できます。\r\n↓こんな感じで表示されます。",
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
      descriptino:
        "ログインすると、「投稿」でコマンドが投稿できます。\r\n" +
        "投稿したコマンドは誰でも参照することができます。\r\n" +
        "誰が投稿したのかは、管理者のみ知ることができます。\r\n" +
        "シークレットキーやパスワード、個人情報などを含まないように注意してください。\r\n",
      tags: ["ログイン時のみ"],
      user: null,
      iconDisplay: false,
    },
    {
      command: "コマンドの編集",
      descriptino:
        "自分が投稿したコマンドは、右下にEditアイコンが表示されます。\r\nクリックすると編集画面が開きます。",
      tags: ["ログイン時のみ"],
      user: "niharu",
      iconDisplay: true,
    },
    {
      command: "自分が投稿したコマンドのみ表示",
      descriptino:
        "右上のメニューで、自分が投稿したコマンドのみ表示することができます。",
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
            <Box
              key={document.command}
              border="1px"
              borderColor="gray.400"
              borderRadius="md"
              mb="3"
              p="2"
              shadow="md"
            >
              <Stack>
                <Text fontSize="md">{document.command}</Text>
                <Divider borderColor="gray.300" />
                <Text fontSize="md">{document.descriptino}</Text>
                <HStack>
                  {document.tags.map((tag: string) => (
                    <TagUi key={tag} size="sm">
                      {tag}
                    </TagUi>
                  ))}
                  <Spacer />
                  {document.iconDisplay && (
                    <>
                      {document.user !== null ? (
                        <Tooltip label={"ここでは編集画面は開きません"}>
                          <IconButton
                            size="xs"
                            icon={<EditIcon />}
                            aria-label="edit"
                            colorScheme="teal"
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip label="author: niharu">
                          <IconButton
                            size="xs"
                            icon={<InfoOutlineIcon />}
                            aria-label="edit"
                          />
                        </Tooltip>
                      )}
                      <Tooltip label="copy">
                        <IconButton
                          icon={<CopyIcon />}
                          size="xs"
                          aria-label="ここをクリックすると、クリップボードにコピーされます。"
                        />
                      </Tooltip>
                    </>
                  )}
                </HStack>
              </Stack>
            </Box>
          ))}
        </List>
        <Center>
          <Link to="/">
            <Text as="u">Home</Text>
          </Link>
        </Center>
        <Center>
          <HStack>
            <Text fontSize="xs">Created by niharu</Text>
            <ChakraLink isExternal href="https://github.com/niharu/commandoc">
              <AiFillGithub />
            </ChakraLink>
            <AiOutlineTwitter />
          </HStack>
        </Center>
      </Stack>
    </>
  );
};
