import { Wrap, WrapItem } from "@chakra-ui/react";

type WrapperProps = {
  contentList: any[];
};
export const Wrapper = ({ contentList }: WrapperProps) => {
  return (
    <>
      <Wrap>
        {contentList.map((content) => {
          return <WrapItem>{content}</WrapItem>;
        })}
      </Wrap>
    </>
  );
};
