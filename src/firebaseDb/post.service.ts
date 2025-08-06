import { db } from "@/firebaseConfig";
import type { Post } from "@/types";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { postConverter } from "./converter";

const COLLECTION_NAME = "post";

export const createPost = (post: Post) => {
    return addDoc(collection(db, COLLECTION_NAME), post);
};

export const getPosts = () => {
    const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"));
    return getDocs(q);
};


export const getPostByUserId = async (userId: string) => {
  console.log("Fetching posts for UID:", userId);
  
  const q = query(
    collection(db, "post"),
    where("userId", "==", userId) // ✅ top-level query
  );

  const querySnapshot = await getDocs(q);
  console.log("Query size:", querySnapshot.size);

  return querySnapshot;
};

export const getPost = (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return getDoc(docRef);
};

export const deletePost = (id: string) => {
    return deleteDoc(doc(db, COLLECTION_NAME, id));
};

