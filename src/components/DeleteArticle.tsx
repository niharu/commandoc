import { Button } from "@chakra-ui/react";
import { deleteArticle } from "../api/deleteArticle";

type DeleteArticleProps = {
  id: string;
  setExists: React.Dispatch<React.SetStateAction<boolean>>;
};
export const DeleteArticle = ({ id, setExists }: DeleteArticleProps) => {
  const handleClickDelete = () => {
    deleteArticle(id).then(() => {
      setExists(false);
    });
  };

  return (
    <Button w="200px" colorScheme="red" onClick={handleClickDelete}>
      削除
    </Button>
  );
};
