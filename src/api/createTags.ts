import firebase from "firebase/compat/app";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { Tag } from "../components/Tag";
import "firebase/compat/auth";
import { firebaseConfig } from "../config/config";

firebase.initializeApp(firebaseConfig);
const db = getFirestore();

export const createTags = async (tags: Tag[]) => {
  tags.forEach((tag) => {
    addDoc(collection(db, "tags"), tag);
  });
};
