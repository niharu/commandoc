import { chakra, Box, HStack, Text, Stack, Fade, TagCloseButton } from "@chakra-ui/react";
import { GroupBase, OptionBase, Select } from "chakra-react-select";
import { useEffect, useState } from "react";
import { useFilterWord } from "../hooks/useFilterWord";

import { useSelectedTags } from '../hooks/useSelectedTag';
import { useTags } from '../hooks/useTags';
import Fuse from 'fuse.js';
import { Tag } from "./Tag";
import { Tag as TagUi } from "@chakra-ui/react";
import { useClickable } from "@chakra-ui/clickable";
import { AiFillTags, AiOutlineTags } from "react-icons/ai";
import { IconContext } from "react-icons";

export const TagSelect = () => {
  const tags = useTags();
  const selectedTag = useSelectedTags();
  const filterWord = useFilterWord();
  const [notSelectedTags, setNotSelectedTags] = useState<string[]>([]);

  const handleChangeTags = (e: Tag) => {
    console.log("handleChangeTags e:", e);
    selectedTag.setSelectedTags([]);
  }

  useEffect(() => {
    if (filterWord?.filterWord) {

      const options = {
        threshold: 0.3,
        useExtendedSearch: true,
        keys: [
          "value",
        ]
      };

      // あいまい検索
      const fuse = new Fuse(tags.tags, options);
      const results = fuse.search(filterWord.filterWord);

      const resultTags: string[] = results.map((result: any) => result.item.value);
      setNotSelectedTags(resultTags.filter((tag) => !selectedTag.selectedTags.includes(tag)));
    } else {
      setNotSelectedTags(tags.tags.map(tag => tag.value).filter((tag) => !selectedTag.selectedTags.includes(tag)));
    }
  }, [filterWord, selectedTag]);

  const Clickable = (props: any) => {
    const clickable = useClickable(props)
    return <chakra.button display="inline-flex" {...clickable} />
  }

  const changeTagColor = (tagName: string): string => {
    if (selectedTag.selectedTags.includes(tagName)) {
      return "teal";
    }
    return "gray";
  }

  const addToSelected = (e: any) => {
    selectedTag.setSelectedTags(Array.from(new Set([...selectedTag.selectedTags, e.target.textContent])));
    setNotSelectedTags(selectedTag.selectedTags.filter(tag => tag !== e.target.textContent));
  }

  const removeFromSelected = (e: any) => {
    selectedTag.setSelectedTags(selectedTag.selectedTags.filter(tag => tag !== e.target.textContent));
    setNotSelectedTags([...notSelectedTags, e.target.textContent]);
  }

  const removeAllFromSelected = () => {
    console.log("removeAllFromSelected ");
    selectedTag.setSelectedTags([]);
    setNotSelectedTags(tags.tags.map(tag => tag.value).filter((tag) => !selectedTag.selectedTags.includes(tag)));
  }

  return (
    <Box>
      <Stack>
        <HStack>
          {selectedTag.selectedTags.length === 0 ?
            <Clickable
              as="div"
              _disabled={{ opacity: 0.4, pointerEvents: "none" }} borderRadius="md" >
              <IconContext.Provider value={{ color: '#888' }}>
                <AiFillTags size={20} />
              </IconContext.Provider>
            </Clickable>
            :
            <Clickable
              as="div"
              onClick={removeAllFromSelected}
              _disabled={{ opacity: 0.4, pointerEvents: "none" }} borderRadius="md" >
              <IconContext.Provider value={{ color: '#077' }}>
                <AiFillTags size={20} />
              </IconContext.Provider>
            </Clickable>
          }
          {selectedTag.selectedTags.map((tag: string) =>
            <Clickable
              as="div"
              _disabled={{ opacity: 0.4, pointerEvents: "none" }} borderRadius="md" key={tag + "selected"} >
              <TagUi _hover={{ opacity: 0.6 }} colorScheme="teal" size="sm" onClick={removeFromSelected}>{tag}</TagUi>
            </Clickable>
          )}
          {notSelectedTags.map((tag: string) =>
            <Clickable
              as="div"
              _disabled={{ opacity: 0.4, pointerEvents: "none" }} borderRadius="md" key={tag + "notSelected"} >
              <TagUi _hover={{ opacity: 0.6 }} colorScheme="gray" size="sm" onClick={addToSelected}>{tag}</TagUi>
            </Clickable>
          )}
        </HStack>
      </Stack>
    </Box>
  );
};