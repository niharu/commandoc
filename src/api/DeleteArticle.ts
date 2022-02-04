import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { firebaseConfig } from "../config/config";

firebase.initializeApp(firebaseConfig);
const db = getFirestore();

export const deleteArticle = async (id: string) => {
  await deleteDoc(doc(db, "documents", id));
};
