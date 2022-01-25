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

  return {
    clips,
    searchClips,
    addClip,
    filterClips,
    filteredClips
  };
};