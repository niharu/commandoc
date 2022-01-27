import { Input } from "@chakra-ui/input";

export const IncrementalSearch: React.FC<{ mt: number, placeholder: string, searchWord: string }> = ({ mt, placeholder, searchWord }) => {
  const handleChangeSearchWord = () => {

  }

  return (
    <Input mt={mt} mb="4" type="text" value={searchWord} placeholder={placeholder} onChange={handleChangeSearchWord} />
  );
}