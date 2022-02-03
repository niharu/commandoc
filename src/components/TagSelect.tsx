import {
  chakra,
  Box,
  HStack,
  Stack,
  Wrap,
  WrapItem,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFilterWord } from "../hooks/useFilterWord";

import { useSelectedTags } from "../hooks/useSelectedTag";
import { useTags } from "../hooks/useTags";
import Fuse from "fuse.js";
import { Tag as TagUi } from "@chakra-ui/react";
import { useClickable } from "@chakra-ui/clickable";
import { AiFillTags, AiOutlineFilter, AiOutlineTags } from "react-icons/ai";
import { IconContext } from "react-icons";

export const TagSelect = () => {
  const tags = useTags();
  const selectedTag = useSelectedTags();
  const filterWord = useFilterWord();
  const [notSelectedTags, setNotSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (filterWord?.filterWord && filterWord?.filterWord.length >= 2) {
      const options = {
        threshold: 0.3,
        useExtendedSearch: true,
        keys: ["value"],
      };

      // あいまい検索
      const fuse = new Fuse(tags.tags, options);
      const results = fuse.search(filterWord.filterWord);

      const resultTags: string[] = results.map(
        (result: any) => result.item.value
      );
      setNotSelectedTags(
        resultTags.filter((tag) => !selectedTag.selectedTags.includes(tag))
      );
    } else {
      setNotSelectedTags(
        tags.tags
          .map((tag) => tag.value)
          .filter((tag) => !selectedTag.selectedTags.includes(tag))
      );
    }
  }, [tags, filterWord, selectedTag]);

  const Clickable = (props: any) => {
    const clickable = useClickable(props);
    return <chakra.button display="inline-flex" {...clickable} />;
  };

  const addToSelected = (e: any) => {
    selectedTag.setSelectedTags(
      Array.from(new Set([...selectedTag.selectedTags, e.target.textContent]))
    );
    setNotSelectedTags(
      selectedTag.selectedTags.filter((tag) => tag !== e.target.textContent)
    );
  };

  const removeFromSelected = (e: any) => {
    selectedTag.setSelectedTags(
      selectedTag.selectedTags.filter((tag) => tag !== e.target.textContent)
    );
    setNotSelectedTags([...notSelectedTags, e.target.textContent]);
  };

  const removeAllFromSelected = () => {
    console.log("removeAllFromSelected ");
    selectedTag.setSelectedTags([]);
    setNotSelectedTags(
      tags.tags
        .map((tag) => tag.value)
        .filter((tag) => !selectedTag.selectedTags.includes(tag))
    );
  };

  return (
    <Box>
      <Stack>
        <HStack>
          <Wrap>
            <WrapItem>
              <IconContext.Provider value={{ color: "#888" }}>
                <AiOutlineFilter size={20} />
              </IconContext.Provider>
            </WrapItem>
            <WrapItem>
              <Clickable
                as="div"
                onClick={removeAllFromSelected}
                _disabled={{ opacity: 0.4, pointerEvents: "none" }}
                borderRadius="md"
              >
                <TagUi _hover={{ opacity: 0.6 }} colorScheme="gray" size="sm">
                  自分が投稿
                </TagUi>
              </Clickable>
            </WrapItem>
          </Wrap>
        </HStack>
        <Divider />
        <HStack>
          <Wrap>
            {selectedTag.selectedTags.length === 0 ? (
              <WrapItem>
                <Clickable
                  as="div"
                  _disabled={{ opacity: 0.4, pointerEvents: "none" }}
                  borderRadius="md"
                >
                  <IconContext.Provider value={{ color: "#888" }}>
                    <AiOutlineTags size={20} />
                  </IconContext.Provider>
                </Clickable>
              </WrapItem>
            ) : (
              <WrapItem>
                <Clickable
                  as="div"
                  onClick={removeAllFromSelected}
                  _disabled={{ opacity: 0.4, pointerEvents: "none" }}
                  borderRadius="md"
                >
                  <IconContext.Provider value={{ color: "#077" }}>
                    <AiFillTags size={20} />
                  </IconContext.Provider>
                </Clickable>
              </WrapItem>
            )}
            {selectedTag.selectedTags.map((tag: string) => (
              <WrapItem key={tag}>
                <Clickable
                  as="div"
                  _disabled={{ opacity: 0.4, pointerEvents: "none" }}
                  borderRadius="md"
                  key={tag + "selected"}
                >
                  <TagUi
                    _hover={{ opacity: 0.6 }}
                    colorScheme="teal"
                    size="sm"
                    onClick={removeFromSelected}
                  >
                    {tag}
                  </TagUi>
                </Clickable>
              </WrapItem>
            ))}
            {notSelectedTags.map((tag: string) => (
              <WrapItem key={tag}>
                <Clickable
                  as="div"
                  _disabled={{ opacity: 0.4, pointerEvents: "none" }}
                  borderRadius="md"
                  key={tag + "notSelected"}
                >
                  <TagUi
                    _hover={{ opacity: 0.6 }}
                    colorScheme="gray"
                    size="sm"
                    onClick={addToSelected}
                  >
                    {tag}
                  </TagUi>
                </Clickable>
              </WrapItem>
            ))}
          </Wrap>
        </HStack>
      </Stack>
    </Box>
  );
};
