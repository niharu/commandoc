import { useCallback, useState } from "react"
import { ulid } from "ulid";
import * as ClipAPI from "../api/ClipAPI";
import { Clip } from "../components/Clip";
import { Tag } from "../components/Tag";
import Fuse from 'fuse.js';

export const useClip = () => {
  const [clips, setClips] = useState<Clip[]>([]);

  const [filteredClips, setFilteredClips] = useState<Clip[]>([]);

  const searchClips = useCallback((tags: Tag[]) => {
    ClipAPI.searchClips(tags).then((resultClips: any) => {
      setClips([...resultClips].reverse());
      setFilteredClips([...resultClips].reverse());
    });
  }, []);

  const addClip = async (tags: string[], command: string, description: string) => {
    const newClip: Clip = {
      id: ulid(),
      tags: tags,
      command: command,
      description: description
    };

    const addClip = await ClipAPI.addClip(newClip);
    setClips([addClip, ...clips]);
  };

  const filterClips = (searchWord: string) => {

    if(searchWord === null || searchWord === "") {
      setFilteredClips(clips);
      return;
    }
    const options = {
      threshold: 0.3,
      keys: [
        "command",
        "description"
      ]
    };

    // あいまい検索
    const fuse = new Fuse(clips, options);
    const results = fuse.search(searchWord);

    setFilteredClips(results.map((result: any) => result.item));
  };

  const filterClipsWithTags = (tags: Tag[]) => {

    if(tags === null || tags.length === 0) {
      setFilteredClips(clips);
      return;
    }

    const strTags: string[] = tags.map((tag) => tag.value);
    setFilteredClips(clips.filter((clip: Clip) => clip.tags.some((tag) => strTags.includes(tag))));
  };

  const updateClip = async (clip: Clip) => {
    console.log("update clip:", clip);
    await ClipAPI.updateClip(clip);
  }

  const deleteClip = async(id: string) => {
    await ClipAPI.deleteClip(id);
  }

  return {
    clips,
    searchClips,
    addClip,
    filterClips,
    filteredClips,
    updateClip,
    deleteClip,
    filterClipsWithTags 
  };
};