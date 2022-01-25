import React, { memo } from "react";

import { Image } from "@chakra-ui/react";

export const Title: React.FC<{ title: string, as: any, fontSize: any }> = memo(({ title, as, fontSize }) => {
  return (
    <Image src='./commandoc.png' w="220px" alt='commandoc' />
  );
});