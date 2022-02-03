import { Input } from "@chakra-ui/react";
import { useFilterWord } from "../hooks/useFilterWord";

export const WordFilter = () => {
  const filter = useFilterWord();

  const handleChangeSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    filter.setFilterWord(e.target.value);
  };

  return (
    <Input
      mt="1"
      type="text"
      value={filter.filterWord}
      placeholder="キーワードを入力..."
      onChange={handleChangeSearchWord}
    />
  );
};
