import { Container, Text, Heading, Stack } from "@chakra-ui/react";
import { Title } from "./Title";

export const About = () => {
  return (
    <>
      <Container p={{ base: "4", md: "6" }} maxWidth="3xl">
        <Stack>
          <Title fontSize={{ base: "2xl", md: "3xl" }} title="commandoc" as="h1" />
          <Heading as="h1" size="md">コマンドを共有しよう</Heading>
          <Text>あのコマンド、どうやって書くんだっけ…？</Text>
        </Stack>
      </Container>
    </>
  );
};