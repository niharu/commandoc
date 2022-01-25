import { collection, setDoc, query, where } from "firebase/firestore";
import { getFirestore, getDocs, doc, updateDoc, deleteDoc} from "firebase/firestore";
import { Clip } from "../components/Clip";

import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { firebaseConfig } from "../config/config";
import { Tag } from "../components/Tag";

firebase.initializeApp(firebaseConfig);
const db = getFirestore();

export const searchClips: any = async (tags : Tag[]) => {
  if (tags===null || tags.length === 0) {
    return [];
  }

  const conditionTags = tags.map((tag) => tag.value);
  const q = query(collection(db, "clips"), where("tags", "array-contains-any", conditionTags));
  const querySnapShot = await getDocs(q);
  const clips = querySnapShot.docs.map((doc) => doc.data() as Clip);
  return clips;
};

export const addClip = async (clip: Clip) => {
  await setDoc(doc(db, "clips", clip.id), clip);
  return clip;
};

export const updateClip = async (clip: Clip) => {
  const updateRef = doc(db, "clips", clip.id);
  await updateDoc(updateRef, clip);
}

export const deleteClip = async(id: string) => {
  await deleteDoc(doc(db, "clips", id));
}