// import { Box, Container, Flex, Spacer } from '@chakra-ui/react';
// import { createContext, useCallback, useContext, useEffect, useState } from 'react';
// import { AddClip } from '../components/AddClip';
// import { Clips } from '../components/Clips';
// import { Login } from '../components/Login';
// import { useAuthState } from '../hooks/useAuthState';
// import Select from 'react-select';
// import { IncrementalSearch } from '../components/IncrementalSearch';
// import { useTag } from '../hooks/useTag';
// import { Title } from '../components/Title';
// import { Tag } from '../components/Tag';
// import { Clip } from '../components/Clip';
// import * as ClipAPI from "../api/ClipAPI";
// import { ulid } from "ulid";
// import Fuse from 'fuse.js';
// import { AuthContext } from '../provider/UserProvider';
// import { TagContext } from '../provider/TagProvider';

export const AppWithContext2 = () => {
};
//   const [clips, setClips] = useState<Clip[]>([]);

//   const [filteredClips, setFilteredClips] = useState<Clip[]>([]);

//   const searchClips = useCallback((tags: Tag[]) => {
//     ClipAPI.searchClips(tags).then((resultClips: any) => {
//       setClips([...resultClips].reverse());
//       setFilteredClips([...resultClips].reverse());
//     });
//   }, []);

//   const addClip = async (tags: string[], command: string, description: string) => {
//     const newClip: Clip = {
//       id: ulid(),
//       tags: tags,
//       command: command,
//       description: description
//     };

//     const addClip = await ClipAPI.addClip(newClip);
//     setClips([addClip, ...clips]);
//   };

//   const filterClips = (searchWord: string) => {

//     if(searchWord === null || searchWord === "") {
//       setFilteredClips(clips);
//       return;
//     }
//     const options = {
//       threshold: 0.3,
//       keys: [
//         "command",
//         "description"
//       ]
//     };

//     // あいまい検索
//     const fuse = new Fuse(clips, options);
//     const results = fuse.search(searchWord);

//     setFilteredClips(results.map((result: any) => result.item));
//   };

//   const filterClipsWithTags = (tags: Tag[]) => {

//     if(tags === null || tags.length === 0) {
//       setFilteredClips(clips);
//       return;
//     }

//     const strTags: string[] = tags.map((tag) => tag.value);
//     setFilteredClips(clips.filter((clip: Clip) => clip.tags.some((tag) => strTags.includes(tag))));
//   };

//   const updateClip = async (clip: Clip) => {
//     console.log("update clip:", clip);
//     await ClipAPI.updateClip(clip);
//   }

//   const deleteClip = async(id: string) => {
//     await ClipAPI.deleteClip(id);
//   }

//   const auth = useContext(AuthContext);
//   const tag = useContext(TagContext);

//   const [searchWord, setSearchWord] = useState('');

//   const handleChangeSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchWord(e.target.value);
//     filterClips(e.target.value);
//   };

//   const handleChangeFilterTags = (e: any) => {
//     filterClipsWithTags(e);
//   };

//   useEffect(() => {
//     if(tag != null) {
//       searchClips(tag.filterTags);
//     }
//   }, [tag!.filterTags, searchClips]);

//   return (
//     <Container p={{ base: "4", md: "6" }} maxWidth="3xl">
//       <Flex mb={3}>
//         <Box>
//           <Title fontSize={{ base: "2xl", md: "3xl" }} title="commandoc" as="h1" />
//         </Box>
//         <Spacer />
//         {auth != null && auth?.isSignedIn ?
//           <AddClip addClip={addClip}/>
//           :
//           <Box>
//             <Login />
//           </Box>
//         }
//       </Flex>
//       <Select
//         options={tag?.tags}
//         isMulti
//         onChange={handleChangeFilterTags}
//       />
//       <IncrementalSearch
//         mt={3}
//         placeholder="絞り込み"
//         searchWord={searchWord}
//         handleChangeSearchWord={handleChangeSearchWord}
//       />
//       <Clips clips={filteredClips} updateClip={updateClip} deleteClip={deleteClip}/>
//     </Container>
//   );
// };