import Select from 'react-select';
import { useSelectedTags } from '../hooks/useSelectedTag';
import { useTags } from '../hooks/useTags';

export const TagSelect = () => {
  const tags = useTags();
  const selectedTag = useSelectedTags();

  const handleChangeTags = (e: any) => {
    console.log("e:", e);
    selectedTag.setSelectedTags(e);
  }

  return (
    <Select
      options={tags}
      isMulti
      onChange={handleChangeTags}
    />
  );
};