import { GroupBase, OptionBase, Select } from "chakra-react-select";
import { useSelectedTags } from '../hooks/useSelectedTag';
import { useTags } from '../hooks/useTags';

export const TagSelect = () => {
  const tags = useTags();
  const selectedTag = useSelectedTags();

  const handleChangeTags = (e: any) => {
    selectedTag.setSelectedTags(e);
  }

  return (
    <Select
      placeholder="タグでフィルター"
      options={tags}
      isMulti
      onChange={handleChangeTags}
    />
  );
};