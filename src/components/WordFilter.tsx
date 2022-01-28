import { Input } from "@chakra-ui/react";
import { useFilterWord } from "../hooks/useFilterWord";

export const WordFilter = () => {
  const filter = useFilterWord();

  const handleChangeSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    filter.setFilterWord(e.target.value);
  };

  return (
    <Input mt="1" mb="4" type="text" value={filter.filterWord} placeholder="文字列でフィルター" onChange={handleChangeSearchWord} />
  );
};