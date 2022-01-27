import { List } from "@chakra-ui/react";
import { Clip } from "./Clip";
import { ClipItem } from "./ClipItem";
import { Tag } from "./Tag";

export const Clips: React.FC<{clips: Clip[], updateClip: any, deleteClip: any}> = ({clips, updateClip,  deleteClip}) => {
  return (
    <>
      {clips.length !== 0 && (
        <>
          <List w="full" >
            {clips.map((clip: Clip) => (
              <ClipItem
                key={clip.id}
                clip={clip}
                updateClip={updateClip}
                deleteClip={deleteClip}
              />
            ))}
          </List>
        </>
      )}
    </>
  );
};