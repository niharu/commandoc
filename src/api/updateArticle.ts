import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { Document } from "../components/Document";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { firebaseConfig } from "../config/config";

firebase.initializeApp(firebaseConfig);
const db = getFirestore();

export const updateArticle = async (document: Document) => {
  const updateRef = doc(db, "documents", document.id);
  await updateDoc(updateRef, document);
};
