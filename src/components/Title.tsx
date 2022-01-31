import React, { memo } from "react";

import { Box, Flex, HStack, Image, Square, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Title: React.FC<{ title: string, as: any, fontSize: any }> = memo(({ title, as, fontSize }) => {
  return (
    <Link to="/">
      <Flex>
        <Square mt="2" mr="2" borderRadius="lg" size='28px' bg='teal' color='white'><Text as="samp" fontSize="20px">&gt;</Text></Square>
        <Text fontSize="25px" >comman</Text>
        <Text fontSize="25px" color="teal.600">doc</Text>
      </Flex>
    </Link>
  );
});