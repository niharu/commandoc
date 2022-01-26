import { List } from "@chakra-ui/react";
import { Clip } from "./Clip";
import { ClipItem } from "./ClipItem";
import { Tag } from "./Tag";

export const Clips: React.FC<{clips: Clip[], tags: Tag[], addTags: any, handleChangeTags: any}> = ({clips, tags, addTags, handleChangeTags }) => {
  return (
    <>
      {clips.length !== 0 && (
        <>
          <List w="full" >
            {clips.map((clip: Clip) => (
              <ClipItem
                key={clip.id}
                clip={clip}
                tags={tags}
                addTags={addTags}
                handleChangeTags={handleChangeTags}
              />
            ))}
          </List>
        </>
      )}
    </>
  );
};