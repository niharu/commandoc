import { Box, Center, Container, Flex, Spacer, Stack, Text } from '@chakra-ui/react';
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
import { UserSettingsProvider } from './provider/UserSettingsProvider';
import { Link } from 'react-router-dom';

function App() {

  return (
    <>
      <Container p={{ base: "4", md: "6" }} maxWidth="3xl">
        <UserProvider>
          <UserSettingsProvider>
            <TagProvider>
              <SelectedTagProvider>
                <FilterWordProvider>
                  <Flex mb={3}>
                    <Box>
                      <Title fontSize={{ base: "2xl", md: "3xl" }} title="commandoc" as="h1" />
                    </Box>
                    <Spacer />
                    <UserMenu />
                  </Flex>
                  <Stack>
                    <TagSelect />
                    <WordFilter />
                    <DocumentList />
                  </Stack>
                </FilterWordProvider>
              </SelectedTagProvider>
            </TagProvider>
          </UserSettingsProvider>
        </UserProvider>
        <Center>
          <Text fontSize="xs">Created by niharu</Text>
        </Center>
        <Center>
          <Link to="/about">about</Link>
        </Center>
      </Container>
    </>
  );
}

export default App;