import { List } from "@chakra-ui/react";
import { Clip } from "./Clip";
import { ClipItem } from "./ClipItem";
import { Tag } from "./Tag";

export const Clips: React.FC<{clips: Clip[], tags: Tag[], updateClip: any, addTags: any, handleChangeTags: any,deleteClip: any}> = ({clips, tags, updateClip, addTags, handleChangeTags, deleteClip}) => {
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
                updateClip={updateClip}
                addTags={addTags}
                handleChangeTags={handleChangeTags}
                deleteClip={deleteClip}
              />
            ))}
          </List>
        </>
      )}
    </>
  );
};