import { Button, PopoverArrow, Textarea } from "@chakra-ui/react";
import { CopyIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Container, Flex, IconButton, Popover, PopoverContent, PopoverTrigger, Spacer, Text, Tooltip } from "@chakra-ui/react";
import { Clip } from "./Clip";
import CreatableSelect from 'react-select/creatable';
import { Tag } from "./Tag";
import { useRef, useState } from "react";

export const ClipItem: React.FC<{ clip: Clip, tags: Tag[], updateClip: any, addTags: any, handleChangeTags: any ,deleteClip: any}> = ({ clip, tags, updateClip, addTags, handleChangeTags ,deleteClip}) => {
  const copy = () => {
    navigator.clipboard.writeText(clip.command);
  }

  const defaultTags: any[] = clip.tags.map((tag) => { return { label: tag, value: tag } });

  const [clipTags, setClipTags] = useState<Tag[]>(defaultTags);

  const [newTags, setNewTags] = useState<Tag[]>([]);

  const commandRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null);

  const [command, setCommand] = useState<string>(clip.command);
  const [description, setDescription] = useState<string>(clip.description);

  const [exists, setExists] = useState<boolean>(true);

  const handleChangeCategory = (selectedTags: any) => {
    setClipTags(selectedTags.map((tag: any) => { return { value: tag.value, label: tag.label }; }));
    setNewTags(selectedTags.filter((tag: any) => tag.__isNew__).map((tag: any) => { return { value: tag.value, label: tag.label }; }));
  };

  const handleClickSave = () => {
    if (commandRef !== null && descriptionRef !== null && commandRef.current !== null && descriptionRef.current !== null) {
      updateClip({ id: clip.id, tags: clipTags.map((tag: Tag) => tag.value), command: commandRef.current.value, description: descriptionRef.current.value } as Clip);
      addTags(newTags);
      handleChangeTags(tags, ...newTags);
      setCommand(commandRef.current.value);
      setDescription(descriptionRef.current.value);
    }
  }

  const handleClickDelete = () => {
    setExists(false);
    deleteClip(clip.id);
  }

  return (
    <>
      {exists &&
        <Container p={{ base: "4", md: "6" }} maxWidth="3xl">
          <Box mt="1" pb="1.5" border='2px' borderColor="white" borderBottomColor='gray.200'>
            <Flex>
              <Box>
                <Tooltip label="copy">
                  <IconButton
                    icon={<CopyIcon />}
                    onClick={copy}
                    size="xs"
                    aria-label="コピー"
                  />
                </Tooltip>
              </Box>
              <Text
                ml="3"
                fontSize="md"
              >
                {command}
              </Text>
              <Spacer />
              <Popover placement="right">
                <PopoverTrigger>
                  <IconButton
                    size="xs"
                    icon={<EditIcon />}
                    backgroundColor="teal.100"
                    aria-label="edit"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <Text>Tags</Text>
                  <CreatableSelect
                    isMulti
                    onChange={handleChangeCategory}
                    options={tags}
                    defaultValue={defaultTags}
                  />
                  <Text mt="3">Command</Text>
                  <Textarea ref={commandRef} defaultValue={clip.command} />
                  <Text mt="3">Description</Text>
                  <Textarea ref={descriptionRef} defaultValue={clip.description} />
                  <Button mt="3" onClick={handleClickSave}>Save</Button>
                  <Button mt="3" onClick={handleClickDelete}>Delete</Button>
                </PopoverContent>
              </Popover>
            </Flex>
          </Box>
          <Box mt="1" ml="10">
            <Text fontSize="md">{description}</Text>
          </Box>
        </Container>
      }
    </>
  );
};
