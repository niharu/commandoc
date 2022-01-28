import { Box, Center, Container, Flex, Spacer, Text } from '@chakra-ui/react';
import { DocumentList } from './components/DocumentList';
import { IncrementalSearch } from './components/IncrementalSearch';
import { TagSelect } from './components/TagSelect';
import { Title } from './components/Title';
import { UserMenu } from './components/UserMenu';
import { WordFilter } from './components/WordFilter';
import { SelectedTagProvider } from './provider/SelectedTagProvider';
import { TagProvider } from './provider/TagProvider';
import { UserProvider } from './provider/UserProvider';
import { FilterWordProvider } from './provider/FilterWordProvider';

function App() {

  return (
    <>
      <Container p={{ base: "4", md: "6" }} maxWidth="3xl">
      {/* <Container centerContent> */}
        <TagProvider>
          <Flex mb={3}>
            <Box>
              <Title fontSize={{ base: "2xl", md: "3xl" }} title="commandoc" as="h1" />
            </Box>
            <Spacer />
            <UserProvider>
              <UserMenu />
            </UserProvider>
          </Flex>
          <SelectedTagProvider>
            <FilterWordProvider>
              <TagSelect />
              <WordFilter />
              <DocumentList />
            </FilterWordProvider>
          </SelectedTagProvider>
        </TagProvider>
      </Container>
    </>
  );
}

export default App;