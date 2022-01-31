import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        // color: "gray.800",
        overflowY: "scroll",
      },
      p: {
        fontSize: {base: "md", md: "lg" },
        lineHeight: "tall",
        whiteSpace: "pre-wrap",
      }
    }
  }
});

export default theme;