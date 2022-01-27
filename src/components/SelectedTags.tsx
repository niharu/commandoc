import { useSelectedTags } from "../hooks/useSelectedTag"

export const SelectedTags = () => {
  const selectedTag = useSelectedTags();
  return (
    <>{selectedTag.selectedTags.map((tag) => tag.label)}</>
  );
}