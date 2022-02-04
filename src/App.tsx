import { Box, Container, Flex, Spacer, Stack } from "@chakra-ui/react";
import { Title } from "./components/Title";
import { UserMenu } from "./components/UserMenu";
import { SelectedTagProvider } from "./provider/SelectedTagProvider";
import { TagProvider } from "./provider/TagProvider";
import { UserProvider } from "./provider/UserProvider";
import { FilterWordProvider } from "./provider/FilterWordProvider";
import { UserSettingsProvider } from "./provider/UserSettingsProvider";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollTop";
import { DocumentProvider } from "./provider/DocumentProvider";

function App() {
  return (
    <>
      <Container p={{ base: "4", md: "6" }} maxWidth="3xl">
        <UserProvider>
          <UserSettingsProvider>
            <DocumentProvider>
              <TagProvider>
                <SelectedTagProvider>
                  <FilterWordProvider>
                    <BrowserRouter>
                      <ScrollToTop>
                        <Flex mb={3}>
                          <Box>
                            <Title />
                          </Box>
                          <Spacer />
                          <UserMenu />
                        </Flex>
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/about" element={<About />} />
                        </Routes>
                        <Stack></Stack>
                      </ScrollToTop>
                    </BrowserRouter>
                  </FilterWordProvider>
                </SelectedTagProvider>
              </TagProvider>
            </DocumentProvider>
          </UserSettingsProvider>
        </UserProvider>
      </Container>
    </>
  );
}

export default App;
