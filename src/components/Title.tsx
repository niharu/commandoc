import { memo } from "react";

import { Flex, Link, Square, Text } from "@chakra-ui/react";

export const Title = memo(() => {
  return (
    <>
      <Flex>
        <Link
          _focus={{ boxShadow: "none" }}
          style={{ textDecoration: "none" }}
          href="https://commandoc.niharu.dev/"
        >
          <Square
            mt="2"
            mr="2"
            borderRadius="lg"
            size="28px"
            bg="teal"
            color="white"
          >
            <Text as="samp" fontSize="20px">
              &gt;
            </Text>
          </Square>
        </Link>
        <Link
          _focus={{ boxShadow: "none" }}
          style={{ textDecoration: "none" }}
          href="https://commandoc.niharu.dev/"
        >
          <Flex>
            <Text fontSize="25px">comman</Text>
            <Text fontSize="25px" color="teal.600">
              doc
            </Text>
          </Flex>
        </Link>
      </Flex>
    </>
  );
});
