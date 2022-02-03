import { Center, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { DocumentList } from "./DocumentList";
import { TagSelect } from "./TagSelect";
import { WordFilter } from "./WordFilter";

export const Home = () => {
  return (
    <>
      <Stack spacing={5}>
        <WordFilter />
        <TagSelect />
        <DocumentList />
        <Center>
          <Link to="/about">
            <Text as="u">About & 使い方</Text>
          </Link>
        </Center>
      </Stack>
    </>
  );
};
