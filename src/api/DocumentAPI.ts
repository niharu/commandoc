import { collection, setDoc, query, where } from "firebase/firestore";
import {
  getFirestore,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Document } from "../components/Document";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { firebaseConfig } from "../config/config";
import { Tag } from "../components/Tag";

firebase.initializeApp(firebaseConfig);
const db = getFirestore();

export const fetchAllDocuments: any = async () => {
  const querySnapShot = await getDocs(collection(db, "documents"));
  const documents = querySnapShot.docs.map((doc) => doc.data() as Document);
  return documents;
};

export const searchDocuments: any = async (tags: Tag[]) => {
  if (tags === null || tags.length === 0) {
    const querySnapShot = await getDocs(collection(db, "documents"));
    const documents = querySnapShot.docs.map((doc) => doc.data() as Document);
    return documents;
  }

  const conditionTags = tags.map((tag) => tag.value);
  const q = query(
    collection(db, "documents"),
    where("tags", "array-contains-any", conditionTags)
  );
  const querySnapShot = await getDocs(q);
  const documents = querySnapShot.docs.map((doc) => doc.data() as Document);
  return documents;
};

export const addDocument = async (document: Document) => {
  await setDoc(doc(db, "documents", document.id), document);
  return document;
};

export const updateDocument = async (document: Document) => {
  const updateRef = doc(db, "documents", document.id);
  await updateDoc(updateRef, document);
};

export const deleteDocument = async (id: string) => {
  await deleteDoc(doc(db, "documents", id));
};
