import { Avatar, Box, Button, Fade, HStack, IconButton, ScaleFade, Text, useColorMode } from "@chakra-ui/react";
import firebase from "firebase/compat/app";
import { useLoginUser } from "../hooks/useLoginUser";
import { AddDocument } from "./AddDocument";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { useSettings } from "../hooks/useSetings";
import { Login } from "./Login";
import { useLoading } from "../hooks/useLoading";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export const UserMenu = () => {
  const user = useLoginUser();
  const settings = useSettings();
  const loading = useLoading();
  const { colorMode, toggleColorMode, setColorMode } = useColorMode();

  const logout = () => {
    firebase.auth().signOut();
  };

  let displayName: string | null = null;
  if (user !== null) {
    displayName = user.displayName;
  }
  if (!displayName) {
    displayName = "";
  }

  let photoURL: string | null = null;
  if (user !== null) {
    photoURL = user.photoURL;
  }
  if (!photoURL) {
    photoURL = "";
  }

  const handleChangeSettings = (e: string | string[]) => {
    settings.setfilterMyCommand(e.includes("filterMyCommand"));
  }

  const handleChangeColorMode = (e: string | string[]) => {
    setColorMode(e);
  }

  return (
    <>
      <Fade in={true}>
        <HStack>
          <>
            {user && !loading ?
              <AddDocument />
              :
              <Login />
            }
            <Box>
              <Menu closeOnSelect={false}>
                <MenuButton as={IconButton} icon={<HamburgerIcon />}></MenuButton>
                <MenuList>
                  {user &&
                    <>
                      <MenuOptionGroup title="設定" type='checkbox' onChange={handleChangeSettings}>
                        <MenuItemOption value="filterMyCommand" >自分が作成したコマンドのみ表示</MenuItemOption>
                      </MenuOptionGroup>
                      <MenuDivider />
                    </>
                  }
                  <MenuOptionGroup defaultValue={colorMode} title="カラーモード" type='radio' onChange={handleChangeColorMode}>
                    <MenuItemOption value="light" >ライト</MenuItemOption>
                    <MenuItemOption value="dark" >ダーク</MenuItemOption>
                  </MenuOptionGroup>
                  {user &&
                    <>
                      <MenuDivider />
                      <MenuGroup title="ユーザー">
                        <MenuItem onClick={logout}>ログアウト</MenuItem>
                      </MenuGroup>
                    </>
                  }
                </MenuList>
              </Menu>
            </Box>
          </>
        </HStack>
      </Fade>
    </>
  );
};