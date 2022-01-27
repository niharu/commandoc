import { Box, Container, Flex, Spacer } from '@chakra-ui/react';
import { SelectedTags } from './components/SelectedTags';
import { TagSelect } from './components/TagSelect';
import { Title } from './components/Title';
import { UserMenu } from './components/UserMenu';
import { SelectedTagProvider } from './provider/SelectedTagProvider';
import { TagProvider } from './provider/TagProvider';
import { UserProvider } from './provider/UserProvider';

function App() {

  return (
    <>
      <Container p={{ base: "4", md: "6" }} maxWidth="3xl">
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
          <TagProvider>
            <TagSelect />
          </TagProvider>
          <SelectedTags />
        </SelectedTagProvider>
      </Container>
    </>
  );
}

export default App;