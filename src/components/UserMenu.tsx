import { Box, Fade, HStack, IconButton, useColorMode } from "@chakra-ui/react";
import firebase from "firebase/compat/app";
import {
  getAuth,
  deleteUser,
  reauthenticateWithCredential,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useLoginUser } from "../hooks/useLoginUser";
import { AddDocument } from "./AddDocument";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useSettings } from "../hooks/useSetings";
import { Login } from "./Login";
import { useLoading } from "../hooks/useLoading";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const UserMenu = () => {
  const user = useLoginUser();
  const settings = useSettings();
  const loading = useLoading();
  const { colorMode, toggleColorMode } = useColorMode();

  const logout = () => {
    settings.setfilterMyCommand(false);
    firebase.auth().signOut();
  };

  const deleteTmp = () => {
    if (user !== null) {
      const auth = getAuth();
      const provider = new GithubAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GithubAuthProvider.credentialFromResult(result);
          if (credential !== null) {
            reauthenticateWithCredential(user, credential)
              .then(() => {
                deleteUser(user)
                  .then(() => {
                    alert("アカウントを削除しました");
                  })
                  .catch((error) => {
                    alert("アカウント削除に失敗しました");
                  });
              })
              .catch((error) => {
                console.log("reauth is fault");
              });
          }
        })
        .catch((error) => {
          console.log("サインインに失敗しました");
        });
    }
  };

  const handleChangeSettings = (e: string | string[]) => {
    settings.setfilterMyCommand(e.includes("filterMyCommand"));
  };

  return (
    <>
      <Fade in={true}>
        <HStack>
          <>
            {colorMode === "light" ? (
              <IconButton
                aria-label="moon"
                bg="white"
                icon={<MoonIcon />}
                onClick={toggleColorMode}
              />
            ) : (
              <IconButton
                aria-label="sun"
                bg="blackAlpha"
                icon={<SunIcon />}
                onClick={toggleColorMode}
              />
            )}
            {user && !loading ? <AddDocument /> : <Login />}
            <Box>
              {user && (
                <Menu closeOnSelect={false}>
                  <MenuButton
                    as={IconButton}
                    icon={<HamburgerIcon />}
                  ></MenuButton>
                  <MenuList>
                    <MenuOptionGroup
                      type="checkbox"
                      onChange={handleChangeSettings}
                    >
                      <MenuItemOption value="filterMyCommand">
                        自分が作成したコマンドのみ表示
                      </MenuItemOption>
                    </MenuOptionGroup>
                    <MenuDivider />
                    <MenuItem onClick={logout}>ログアウト</MenuItem>
                    <MenuItem color="red.400" onClick={deleteTmp}>
                      アカウント削除
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Box>
          </>
        </HStack>
      </Fade>
    </>
  );
};
