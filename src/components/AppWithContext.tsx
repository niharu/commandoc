import { Box, Container, Flex, Spacer } from '@chakra-ui/react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AddClip } from '../components/AddClip';
import { Clips } from '../components/Clips';
import { Login } from '../components/Login';
import { useAuthState } from '../hooks/useAuthState';
import Select from 'react-select';
import { IncrementalSearch } from '../components/IncrementalSearch';
import { useTag } from '../hooks/useTag';
import { Title } from '../components/Title';
import { Tag } from '../components/Tag';
import { Clip } from '../components/Clip';
import * as ClipAPI from "../api/ClipAPI";
import { ulid } from "ulid";
import Fuse from 'fuse.js';
import { TagContext } from '../provider/TagProvider';
import { Logout } from './Logout';
import { useLoginUser } from '../hooks/useLoginUser';

export const AppWithContext = () => {
  const user = useLoginUser();

  return (
    <Container p={{ base: "4", md: "6" }} maxWidth="3xl">
      <Flex mb={3}>
        <Box>
          <Title fontSize={{ base: "2xl", md: "3xl" }} title="commandoc" as="h1" />
        </Box>
        <Spacer />
        {/* {auth.isSignedIn ?
          <Box>
            <Logout />
            <>追加ボタン</>
          </Box>
          :
          <Box>
            <Login />
          </Box>
        } */}
      </Flex>
    </Container>
  );
};